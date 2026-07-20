import React, { createContext, useContext, useState, useEffect } from 'react';

const VoiceContext = createContext();

const TELUGU_PROMPTS = {
  welcome: "గ్రీన్ రూట్ AI కి స్వాగతం. మీ పర్యావరణ అనుకూల ప్రయాణం ప్రారంభమైంది.",
  recommendation: "ఫ్యూయెల్ మరియు కార్బన్ ఉద్గారాలను తగ్గించడానికి రూట్ B సిఫార్సు చేయబడింది.",
  traffic: "ముందు భారీ ట్రాఫిక్ గుర్తించబడింది. పచ్చని ప్రత్యామ్నాయ మార్గానికి మారుతున్నాము.",
  heavyRain: "10 నిమిషాల్లో భారీ వర్షం పడే అవకాశం ఉంది. దయచేసి వేగం తగ్గించండి.",
  rain: "మీ మార్గంలో వర్షం పడే అవకాశం ఉంది. దయచేసి జాగ్రత్తగా డ్రైవ్ చేయండి.",
  fuelSavings: "ఈ మార్గాన్ని అనుసరించడం ద్వారా మీరు 35 రూపాయల ఇంధనాన్ని పొదుపు చేశారు.",
  co2Savings: "నేటి ప్రయాణం CO₂ ఉద్గారాలను 2 కిలోలు తగ్గించింది. పర్యావరణాన్ని పరిరక్షించడంలో గొప్ప పని సాధించారు.",
  evStation: "1.2 కిలోమీటర్ల దూరంలో EV ఛార్జింగ్ స్టేషన్ అందుబాటులో ఉంది.",
  accident: "ముందు ప్రమాదం నమోదైంది. మరింత సురక్షితమైన మరియు హరిత మార్గాన్ని కనుగొంటున్నాము.",
  airQuality: "మీ ప్రస్తుత మార్గంలో గాలి నాణ్యత తక్కువగా ఉంది. శుభ్రమైన మార్గానికి మారుతున్నాము.",
  construction: "ముందు రోడ్డు నిర్మాణం గుర్తించబడింది. మీ ఇకో రూట్ రీ-క్యాక్యులేట్ చేయబడుతోంది.",
  lowFuel: "ఇంధన స్థాయి తక్కువగా ఉంది. సమీపంలోని ఫ్యూయెల్ స్టేషన్‌లో రీఫిల్ చేయండి.",
  lowBattery: "బ్యాటరీ స్థాయి తక్కువగా ఉంది. సమీప EV ఛార్జింగ్ స్టేషన్ మీ మార్గంలో ఉంది.",
  arrival: "మీరు మీ గమ్యస్థానానికి చేరుకున్నారు. సుస్థిర ప్రయాణాన్ని ఎంచుకున్నందుకు ధన్యవాదాలు."
};

const ENGLISH_PROMPTS = {
  welcome: "Welcome to GreenRoute AI. Your eco-friendly journey starts now.",
  recommendation: "Route B is recommended because it saves fuel and reduces carbon emissions.",
  traffic: "Heavy traffic detected ahead. Switching to a greener route.",
  heavyRain: "Heavy rain expected in 10 minutes. Please reduce your speed.",
  rain: "Rain is expected on your route. Please drive carefully.",
  fuelSavings: "You have saved ₹35 in fuel by following this route.",
  co2Savings: "Today's trip reduced CO₂ emissions by 2 kg. Great job protecting the environment.",
  evStation: "Nearby EV charging station available in 1.2 km.",
  accident: "Accident reported ahead. Finding a safer and greener alternative route.",
  airQuality: "Air quality is poor on your current route. Switching to a cleaner route.",
  construction: "Road construction detected ahead. Recalculating your eco-friendly route.",
  lowFuel: "Fuel level is estimated to be low. Consider refueling at the nearest fuel station.",
  lowBattery: "Battery level is low. Nearest EV charging station is available on your route.",
  arrival: "You have reached your destination. Thank you for choosing sustainable travel."
};

export function VoiceProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState('en-US'); // 'en-US' or 'te-IN'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState('');

  const speakText = (textKeyOrCustomText) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop ongoing speech

    let textToSpeak = textKeyOrCustomText;
    if (language === 'te-IN' && TELUGU_PROMPTS[textKeyOrCustomText]) {
      textToSpeak = TELUGU_PROMPTS[textKeyOrCustomText];
    } else if (ENGLISH_PROMPTS[textKeyOrCustomText]) {
      textToSpeak = ENGLISH_PROMPTS[textKeyOrCustomText];
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setLastSpokenText(textToSpeak);
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleMute = () => {
    if (isSpeaking) window.speechSynthesis.cancel();
    setIsMuted(prev => !prev);
  };

  return (
    <VoiceContext.Provider value={{
      isMuted,
      toggleMute,
      language,
      setLanguage,
      isSpeaking,
      lastSpokenText,
      speakText,
      prompts: language === 'te-IN' ? TELUGU_PROMPTS : ENGLISH_PROMPTS
    }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}
