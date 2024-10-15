import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SupabaseObjType, SupabaseWhereType } from './types';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('supabase.url');
    const supabaseAnonKey = this.configService.get<string>('supabase.anonKey');

    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  async select<T extends object[]>(table: string, select: string, where: SupabaseWhereType = {}) {
    const formattedWhere = Object.fromEntries(
      Object.entries(where).filter(([, value]) => value !== undefined)
    );

    const { data, error } = await this.supabase
      .from(table)
      .select(select)
      .match(formattedWhere)
      .returns<T>();

    if (error) {
      throw error;
    }

    return data;
  }

  async selectOne<T extends object | null>(
    table: string,
    select: string,
    where: SupabaseWhereType = {}
  ): Promise<T> {
    const formattedWhere = Object.fromEntries(
      Object.entries(where).filter(([, value]) => value !== undefined)
    );

    const { data, error } = await this.supabase
      .from(table)
      .select(select)
      .match(formattedWhere)
      .returns<T[]>()
      .limit(1);

    if (error) {
      throw error;
    }

    return data[0] || null;
  }

  async create<T extends object>(table: string, obj: SupabaseObjType) {
    const { data, error } = await this.supabase.from(table).insert(obj).select().returns<T[]>();

    if (error) {
      throw error;
    }

    return data[0];
  }

  async update<T extends object>(
    table: string,
    obj: SupabaseObjType,
    where: SupabaseWhereType = {}
  ) {
    const { data, error } = await this.supabase
      .from(table)
      .update(obj)
      .match(where)
      .select()
      .returns<T[]>();

    if (error) {
      throw error;
    }

    return data[0];
  }

  async delete<T extends object | null>(table: string, where: SupabaseWhereType = {}) {
    const { error } = await this.supabase.from(table).delete().match(where);

    if (error) {
      throw error;
    }

    const data = await this.selectOne<T>(table, '*', where);

    return !data;
  }

  async downloadFile(storage: string, path: string) {
    const { data, error } = await this.supabase.storage.from(storage).download(path);

    if (error) {
      throw error;
    }

    return data;
  }

  async uploadFile(storage: string, path: string) {
    const { data, error } = await this.supabase.storage.from(storage).upload(path, '');

    if (error) {
      throw error;
    }

    return data;
  }

  async removeFile(storage: string, path: string) {
    const { data, error } = await this.supabase.storage.from(storage).remove([path]);

    if (error) {
      throw error;
    }

    return Boolean(data && data[0]);
  }
}
