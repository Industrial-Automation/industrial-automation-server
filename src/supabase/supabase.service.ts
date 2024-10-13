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

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase configuration: URL or Anon Key is not defined');
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  async select(table: string, select: string, where: SupabaseWhereType = {}) {
    const { data, error } = await this.supabase.from(table).select(select).match(where);

    if (error) {
      throw error;
    }

    return data;
  }

  async selectOne(table: string, select: string, where: SupabaseWhereType = {}) {
    const { data, error } = await this.supabase.from(table).select(select).match(where).limit(1);

    if (error) {
      throw error;
    }

    return data ? data[0] : null;
  }

  async create(table: string, obj: SupabaseObjType) {
    const { data, error } = await this.supabase.from(table).insert(obj).select();

    if (error) {
      throw error;
    }

    return data[0];
  }

  async update(table: string, obj: SupabaseObjType, where: SupabaseWhereType = {}) {
    const { data, error } = await this.supabase.from(table).update(obj).match(where).select();

    if (error) {
      throw error;
    }

    return data[0];
  }

  async delete(table: string, where: SupabaseWhereType = {}) {
    const { error } = await this.supabase.from(table).delete().match(where);

    if (error) {
      throw error;
    }

    const result = await this.selectOne(table, '*', where);

    return Boolean(result && result.length);
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
