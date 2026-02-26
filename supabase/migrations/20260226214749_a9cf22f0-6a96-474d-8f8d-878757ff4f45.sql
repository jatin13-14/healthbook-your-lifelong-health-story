
-- Health Records table
CREATE TABLE public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  record_date DATE NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records" ON public.health_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own records" ON public.health_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own records" ON public.health_records
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own records" ON public.health_records
  FOR DELETE USING (auth.uid() = user_id);

-- Medications table
CREATE TABLE public.medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  prescriber TEXT,
  frequency TEXT,
  purpose TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  refills_left INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own medications" ON public.medications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own medications" ON public.medications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own medications" ON public.medications
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own medications" ON public.medications
  FOR DELETE USING (auth.uid() = user_id);

-- Emergency Profiles table (one per user)
CREATE TABLE public.emergency_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  blood_group TEXT,
  allergies TEXT[] DEFAULT '{}',
  chronic_conditions TEXT[] DEFAULT '{}',
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.emergency_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own emergency profile" ON public.emergency_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own emergency profile" ON public.emergency_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own emergency profile" ON public.emergency_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Storage bucket for medical files
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-files', 'medical-files', false);

CREATE POLICY "Users can upload own medical files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'medical-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can view own medical files" ON storage.objects
  FOR SELECT USING (bucket_id = 'medical-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete own medical files" ON storage.objects
  FOR DELETE USING (bucket_id = 'medical-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Updated_at trigger for emergency_profiles
CREATE TRIGGER update_emergency_profiles_updated_at
  BEFORE UPDATE ON public.emergency_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
