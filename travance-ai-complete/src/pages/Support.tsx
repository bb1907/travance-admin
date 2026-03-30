import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Conversation, ChatMessage } from '../types';
import {
  Search,
  Send,
  Sparkles,
  Circle,
  CheckCircle,
  AlertTriangle,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Bot,
} from 'lucide-react';

const mockConversations: Conversation[] = [
  { id: 'C1', customer: { name: 'Ahmet Yılmaz', initials: 'AY', color: 'bg-teal-500' }, lastMessage: 'Balon turu hakkında bilgi alabilir miyim?', time: '2dk', status: 'active', unread: true },
  { id: 'C2', customer: { name: 'Maria Schmidt', initials: 'MS', color: 'bg-violet-500' }, lastMessage: 'Rezervasyonumu iptal etmek istiyorum.', time: '15dk', status: 'escalated', unread: true },
  { id: 'C3', customer: { name: 'John Davies', initials: 'JD', color: 'bg-blue-500' }, lastMessage: 'Teşekkürler, çok yardımcı oldunuz!', time: '1s', status: 'resolved' },
  { id: 'C4', customer: { name: 'Sophie Laurent', initials: 'SL', color: 'bg-cyan-500' }, lastMessage: 'Ödeme sorunu yaşıyorum.', time: '3s', status: 'active', unread: true },
  { id: 'C5', customer: { name: 'Can Demir', initials: 'CD', color: 'bg-indigo-500' }, lastMessage: 'Tarih değişikliği yapabilir misiniz?', time: '5s', status: 'active' },
];

const mockMessages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Merhaba, Kapadokya balon turu hakkında bilgi alabilir miyim?', time: '14:22' },
  { id: '2', role: 'assistant', content: 'Merhaba Ahmet Bey! Kapadokya balon turumuz her gün gün doğumunda gerçekleşmektedir. Yaklaşık 1 saat süren uçuşta Göreme, Uçhisar ve Avanos manzaralarını göreceksiniz. Fiyatımız kişi başı $180\'dir.', time: '14:23' },
  { id: '3', role: 'user', content: 'Çocuklarla katılabilir miyiz? 8 yaşında bir kızım var.', time: '14:25' },
  { id: '4', role: 'assistant', content: '6 yaş ve üzeri çocuklar aileleriyle birlikte katılabilir. Çocuklar için %30 indirim uygulanmaktadır. Ayrıca özel aile balonu seçeneğimiz de mevcuttur.', time: '14:26' },
];

const statusIndicators: Record<string, { color: string; label: string }> = {
  active: { color: 'bg-emerald-500', label: 'Aktif' },
  resolved: { color: 'bg-slate-400', label: 'Çözüldü' },
  escalated: { color: 'bg-amber-500', label: 'Eskalasyon' },
};

export function Support() {
  const { t } = useLanguage();
  const [selectedConvo, setSelectedConvo] = useState<string>('C1');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorunuzu aldım ve en kısa sürede detaylı bilgi vereceğim. Başka bir sorunuz var mı?',
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  const filteredConvos = mockConversations.filter((c) =>
    c.customer.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCustomer = mockConversations.find((c) => c.id === selectedConvo);

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
      {/* Conversation List */}
      <div className="w-80 border-r border-slate-200/80 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">{t('support.conversations')}</h3>
          <div className="flex items-center gap-2 bg-slate-100/80 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('common.search')}
              className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 ${
                selectedConvo === convo.id ? 'bg-teal-50/50 border-l-2 border-l-teal-500' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 rounded-xl ${convo.customer.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {convo.customer.initials}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusIndicators[convo.status].color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800 truncate">{convo.customer.name}</span>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{convo.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{convo.lastMessage}</p>
              </div>
              {convo.unread && (
                <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        {selectedCustomer && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${selectedCustomer.customer.color} flex items-center justify-center text-white text-xs font-bold`}>
                {selectedCustomer.customer.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{selectedCustomer.customer.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  selectedCustomer.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                  selectedCustomer.status === 'escalated' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {statusIndicators[selectedCustomer.status].label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><Phone className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><Video className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-2 max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-800 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                  <span className={`block text-[10px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2">
            <button className="p-1 text-slate-400 hover:text-slate-600"><Paperclip className="w-4 h-4" /></button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesaj yazın..."
              className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder-slate-400"
            />
            <button className="p-1 text-slate-400 hover:text-slate-600"><Smile className="w-4 h-4" /></button>
            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-2 px-2">
            <Sparkles className="w-3 h-3 text-teal-500" />
            <span className="text-[10px] text-slate-400">{t('support.aiAssistant')} aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
}
