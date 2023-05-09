import {up as prev_up, } from "./0001_create_start_tables";
import Post from '../../models/PostModel';


export async function up(): Promise<void> {
  await prev_up();
  await Post.sync();
}

export async function down(): Promise<void> {
  await Post.drop();
}