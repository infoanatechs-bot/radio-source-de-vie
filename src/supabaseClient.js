import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmpnyoaqdjgrqhbhcdip.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcG55b2FxZGpncnFoYmhjZGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwMjE5ODIsImV4cCI6MjExMDU5Nzk4Mn0.kshCcD3FxRcrXyPd-6IvVZ8Nty_sVLyvHtqk_HQH5W4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
