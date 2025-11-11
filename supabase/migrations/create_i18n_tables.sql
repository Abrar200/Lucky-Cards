-- Translation Management System Database Schema

-- Locales table
CREATE TABLE IF NOT EXISTS locales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale_code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  script VARCHAR(50),
  rtl BOOLEAN DEFAULT false,
  font_family VARCHAR(100),
  fallbacks TEXT[],
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- String keys table
CREATE TABLE IF NOT EXISTS string_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(500) UNIQUE NOT NULL,
  component VARCHAR(50) NOT NULL,
  notes TEXT,
  char_limit INTEGER,
  screenshots TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- String values table
CREATE TABLE IF NOT EXISTS string_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_id UUID REFERENCES string_keys(id) ON DELETE CASCADE,
  locale VARCHAR(10) NOT NULL,
  text TEXT,
  status VARCHAR(20) DEFAULT 'missing' CHECK (status IN ('missing', 'pending', 'complete', 'flagged')),
  version VARCHAR(20),
  updated_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  qa_flags TEXT[],
  UNIQUE(key_id, locale)
);

-- Translation overrides table
CREATE TABLE IF NOT EXISTS translation_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_type VARCHAR(20) CHECK (scope_type IN ('operator', 'market')),
  scope_id VARCHAR(100),
  key_id UUID REFERENCES string_keys(id) ON DELETE CASCADE,
  locale VARCHAR(10),
  text TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  version VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(scope_type, scope_id, key_id, locale)
);

-- Releases table
CREATE TABLE IF NOT EXISTS translation_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  locales TEXT[],
  changelog TEXT,
  locked BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS translation_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  before JSONB,
  after JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_string_values_locale ON string_values(locale);
CREATE INDEX idx_string_values_status ON string_values(status);
CREATE INDEX idx_string_values_key_id ON string_values(key_id);
CREATE INDEX idx_string_keys_component ON string_keys(component);
CREATE INDEX idx_overrides_scope ON translation_overrides(scope_type, scope_id);
CREATE INDEX idx_audit_logs_entity ON translation_audit_logs(entity_type, entity_id);

-- RLS Policies
ALTER TABLE locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE string_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE string_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on locales" ON locales FOR ALL USING (true);
CREATE POLICY "Allow all on string_keys" ON string_keys FOR ALL USING (true);
CREATE POLICY "Allow all on string_values" ON string_values FOR ALL USING (true);
CREATE POLICY "Allow all on overrides" ON translation_overrides FOR ALL USING (true);
CREATE POLICY "Allow all on releases" ON translation_releases FOR ALL USING (true);
CREATE POLICY "Allow all on audit_logs" ON translation_audit_logs FOR ALL USING (true);
