import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://onxqrfrydcojhqzfgvro.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueHFyZnJ5ZGNvamhxemZndnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjQ0MTcsImV4cCI6MjA2NTU0MDQxN30._FyQzSGqpuYzwFYM7qPA3FAApNEHMwee0rHy2ji-JT0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);