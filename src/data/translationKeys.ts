// Comprehensive translation keys for Lucky Cards
// All visible text must use these keys instead of hard-coded strings

export const TRANSLATION_KEYS = {
  // Game Menu
  menu: {
    title: 'menu.title',
    background_music: 'menu.background_music',
    background_music_description: 'menu.background_music_description',
    sound: 'menu.sound',
    sound_description: 'menu.sound_description',
    toggle_on: 'menu.toggle_on',
    toggle_off: 'menu.toggle_off',
  },

  // Info / How to Play
  info: {
    title: 'info.title',
    overview_title: 'info.overview_title',
    overview_description: 'info.overview_description',
    core_gameplay_title: 'info.core_gameplay_title',
    core_gameplay_description: 'info.core_gameplay_description',
    how_it_works_title: 'info.how_it_works_title',
    how_it_works: {
      step1: 'info.how_it_works.step1',
      step2: 'info.how_it_works.step2',
      step3: 'info.how_it_works.step3',
      step4: 'info.how_it_works.step4',
      step5: 'info.how_it_works.step5',
      step5_detail1: 'info.how_it_works.step5_detail1',
      step5_detail2: 'info.how_it_works.step5_detail2',
      step6: 'info.how_it_works.step6',
    },

    jackpot_title: 'info.jackpot_title',
    jackpot_how_it_works: 'info.jackpot_how_it_works',
    jackpot_rule1: 'info.jackpot_rule1',
    jackpot_reset_description: 'info.jackpot_reset_description',
    notes_title: 'info.notes_title',
  },

  // Paytable
  table: {
    pay: {
      '1_of_chosen_card': 'table.pay.1_of_chosen_card',
      '3_of_chosen_suit': 'table.pay.3_of_chosen_suit',
      '4_of_chosen_suit': 'table.pay.4_of_chosen_suit',
      '5_of_chosen_colour': 'table.pay.5_of_chosen_colour',
      card_345_colour: 'table.pay.card_345_colour',
      pair: 'table.pay.pair',
      two_pair: 'table.pay.two_pair',
      three_of_a_kind: 'table.pay.three_of_a_kind',
      straight: 'table.pay.straight',
      flush: 'table.pay.flush',
      full_house: 'table.pay.full_house',
      straight_flush: 'table.pay.straight_flush',
      royal_flush: 'table.pay.royal_flush',
    },
    multiplier: {
      '8_to_1': 'table.pay.multiplier.8_to_1',
      '9_to_1': 'table.pay.multiplier.9_to_1',
      '20_to_1': 'table.pay.multiplier.20_to_1',
      '30_to_1': 'table.pay.multiplier.30_to_1',
      '40_to_1': 'table.pay.multiplier.40_to_1',
      '50_to_1': 'table.pay.multiplier.50_to_1',
      '100_to_1': 'table.pay.multiplier.100_to_1',
      '500_to_1': 'table.pay.multiplier.500_to_1',
    },
  },

  // Admin - Common
  admin: {
    dashboard: {
      title: 'admin.dashboard.title',
    },
    operators: {
      title: 'admin.operators.title',
      name: 'admin.operators.name',
      markets: 'admin.operators.markets',
      currency: 'admin.operators.currency',
      status: 'admin.operators.status',
      revenue_30d: 'admin.operators.revenue_30d',
    },
    jackpots: {
      title: 'admin.jackpots.title',
      global: 'admin.jackpots.global',
      local: 'admin.jackpots.local',
      mystery: 'admin.jackpots.mystery',
      current_pool: 'admin.jackpots.current_pool',
      seed_amount: 'admin.jackpots.seed_amount',
      contribution: 'admin.jackpots.contribution',
      total_wins: 'admin.jackpots.total_wins',
    },
    streaks: {
      title: 'admin.streaks.title',
      win_streak_bonus: 'admin.streaks.win_streak_bonus',
      comeback_special: 'admin.streaks.comeback_special',
      high_roller_streak: 'admin.streaks.high_roller_streak',
      type: 'admin.streaks.type',
      threshold: 'admin.streaks.threshold',
      reward: 'admin.streaks.reward',
    },
    languages: {
      title: 'admin.languages.title',
      import: 'admin.languages.import',
      export: 'admin.languages.export',
      version_history: 'admin.languages.version_history',
      search_placeholder: 'admin.languages.search_placeholder',
      translation_key: 'admin.languages.translation_key',
      en_text: 'admin.languages.en_text',
      status: 'admin.languages.status',
      version: 'admin.languages.version',
      actions: 'admin.languages.actions',
      missing: 'admin.languages.missing',
      pending: 'admin.languages.pending',
      complete: 'admin.languages.complete',
    },
  },

  // Common Actions
  actions: {
    edit: 'actions.edit',
    analytics: 'actions.analytics',
    config: 'actions.config',
    configure: 'actions.configure',
    history: 'actions.history',
    toggle: 'actions.toggle',
    save: 'actions.save',
    cancel: 'actions.cancel',
    delete: 'actions.delete',
    export: 'actions.export',
    import: 'actions.import',
  },

  // Status
  status: {
    active: 'status.active',
    inactive: 'status.inactive',
    pending: 'status.pending',
    complete: 'status.complete',
    missing: 'status.missing',
  },
};
