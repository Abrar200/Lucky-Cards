# Supabase Setup for Translation Management System

## Database Tables

The SQL schema is located in `supabase/migrations/create_i18n_tables.sql`

To apply the schema:
1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste the contents of `create_i18n_tables.sql`
3. Run the query

## Edge Functions to Deploy

### 1. i18n-translations
Handles CRUD operations for translations

**Deploy command:**
```bash
supabase functions deploy i18n-translations
```

**Endpoints:**
- GET /i18n-translations/locales - Get all locales
- PATCH /i18n-translations/locales - Update locale
- GET /i18n-translations/strings - Get translations with filters
- PUT /i18n-translations/update-value - Update translation value

### 2. i18n-import
Handles CSV/JSON import

**Deploy command:**
```bash
supabase functions deploy i18n-import
```

**Endpoint:**
- POST /i18n-import - Import translations from CSV/JSON

### 3. i18n-export
Handles export to various formats

**Deploy command:**
```bash
supabase functions deploy i18n-export
```

**Endpoint:**
- POST /i18n-export - Export translations to JSON/CSV/ZIP

### 4. i18n-versions
Handles version management and diff generation

**Deploy command:**
```bash
supabase functions deploy i18n-versions
```

**Endpoints:**
- GET /i18n-versions?locale=xx - Get version history
- POST /i18n-versions/revert - Revert to previous version
- GET /i18n-versions/diff?locale=xx&from=v1&to=v2 - Generate diff

## Current Status

**Note:** The Supabase project is currently INACTIVE. Once reactivated:

1. Run the SQL migration to create tables
2. Deploy the edge functions using the Supabase CLI
3. The frontend will automatically connect via the configured supabase client

## Frontend Integration

The frontend uses `src/lib/i18nService.ts` which:
- Currently uses localStorage as fallback
- Will automatically switch to Supabase once tables are created
- Provides consistent API regardless of backend

## Testing

To test with localStorage (current setup):
1. Open the Languages page in the admin panel
2. Data is automatically seeded to localStorage
3. All CRUD operations work with localStorage

To switch to Supabase:
1. Ensure tables are created
2. Update `useLocalStorage = false` in `i18nService.ts`
3. All operations will use Supabase backend


## Translation Keys Structure

All translatable text is organized into namespaced keys:

### Game UI Keys
- `menu.*` - Menu and settings
- `info.*` - Game information and how-to-play
- `table.pay.*` - Paytable entries and multipliers

### Admin Dashboard Keys
- `admin.dashboard.*` - Dashboard
- `admin.operators.*` - Operators management
- `admin.jackpots.*` - Jackpot control
- `admin.streaks.*` - Streak campaigns
- `admin.languages.*` - Language management

### Common Keys
- `actions.*` - Action buttons (edit, save, delete, etc.)
- `status.*` - Status labels (active, pending, complete, etc.)

## Using Translations in Components

```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t, loading } = useTranslation('en'); // or any locale
  
  return (
    <div>
      <h1>{t('menu.title')}</h1>
      <p>{t('info.overview_description')}</p>
      <button>{t('actions.save')}</button>
    </div>
  );
}
```

## Seed Data

English translations are pre-seeded in `src/data/seedTranslations.ts`. This includes:
- 80+ translation keys covering all game and admin UI
- Complete English source text
- Organized by component (game, admin, paytable, etc.)

## Adding New Translation Keys

1. Add key to `src/data/translationKeys.ts`
2. Add English text to `src/data/seedTranslations.ts`
3. Use `useTranslation` hook in your component
4. Translators can add other locales via the admin UI
