import User from '../../models/UserModel';
import Auth from '../../models/AuthModel';


export async function up(): Promise<void> {
  await User.sync();
  await Auth.sync();
}

export async function down(): Promise<void> {
  await Auth.drop();
  await User.drop();
}