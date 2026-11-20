import type { Lang } from './i18n';

export interface Step {
  title: string;
  body: string;
}

export const processSteps: Record<Lang, Step[]> = {
  en: [
    {
      title: 'A free intake call',
      body: 'Twenty minutes, by phone or video. You describe what is going on; Edward asks questions, explains the options and is honest about what he can and cannot help with.',
    },
    {
      title: 'A plan made for you',
      body: 'Together you decide on the approach, the number of sessions and the pace. You leave the first session with a clear idea of what happens next.',
    },
    {
      title: 'Sessions at your pace',
      body: 'Each session builds on the last. There is always time to adjust direction, and you are never pushed further than feels safe.',
    },
    {
      title: 'Integration and aftercare',
      body: 'What you discover needs room to settle. You receive practical suggestions for daily life, and a follow-up conversation is always possible.',
    },
  ],
  nl: [
    {
      title: 'Een gratis intakegesprek',
      body: 'Twintig minuten, telefonisch of via video. Je vertelt wat er speelt; Edward stelt vragen, legt de mogelijkheden uit en is eerlijk over wat hij wel en niet kan bieden.',
    },
    {
      title: 'Een plan op maat',
      body: 'Samen bepalen jullie de aanpak, het aantal sessies en het tempo. Na de eerste sessie weet je precies wat er daarna gebeurt.',
    },
    {
      title: 'Sessies in jouw tempo',
      body: 'Elke sessie bouwt voort op de vorige. Er is altijd ruimte om bij te sturen, en je wordt nooit verder geduwd dan veilig voelt.',
    },
    {
      title: 'Integratie en nazorg',
      body: 'Wat je ontdekt, heeft tijd nodig om te bezinken. Je krijgt praktische handvatten voor het dagelijks leven, en een vervolggesprek is altijd mogelijk.',
    },
  ],
};
