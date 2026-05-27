import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

function getWhatsApp(): string {
  try {
    const raw = localStorage.getItem('blcoof_settings');
    if (!raw) return '8675588880000';
    const s = JSON.parse(raw);
    return (s.contactWhatsapp || s.whatsapp || '8675588880000').replace(/[^0-9]/g, '');
  } catch {
    return '8675588880000';
  }
}

function getWeChatId(): string {
  try {
    const raw = localStorage.getItem('blcoof_settings');
    if (!raw) return 'blcoof_official';
    return JSON.parse(raw).wechat || 'blcoof_official';
  } catch {
    return 'blcoof_official';
  }
}

export default function FloatingContact() {
  const { t } = useI18n();
  const [wechatOpen, setWechatOpen] = useState(false);

  const WHATSAPP_NUMBER = getWhatsApp();
  const WHATSAPP_MSG = encodeURIComponent("Hello BLCOOF, I'm interested in your products and would like to get a quote.");
  const WECHAT_ID = getWeChatId();

  return (
    <>
      {/* Floating Buttons */}
      <div className="float-btn">
        {/* Quick Inquiry */}
        <div className="float-btn-item" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="float-btn-label">{t.floating.inquiry}</div>
          <div className="float-btn-circle bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>

        {/* WeChat */}
        <div className="float-btn-item" onClick={() => setWechatOpen(true)}>
          <div className="float-btn-label">{t.floating.wechat}</div>
          <div className="float-btn-circle bg-green-500 hover:bg-green-600 transition-colors cursor-pointer">
            {/* WeChat icon */}
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.328.328 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.832.405c.04 0 .079-.002.118-.003-.062-.29-.092-.587-.092-.889 0-3.477 3.164-6.3 7.065-6.3.193 0 .386.008.578.025C15.304 5.166 12.261 2.188 8.691 2.188zm-1.77 3.377a.98.98 0 11-.002 1.96.98.98 0 01.002-1.96zm3.541 0a.98.98 0 110 1.96.98.98 0 010-1.96zM17.835 9.561c-3.372 0-6.109 2.33-6.109 5.204 0 2.874 2.737 5.204 6.109 5.204.635 0 1.247-.086 1.83-.238a.553.553 0 01.46.063l1.476.864a.264.264 0 00.134.044.237.237 0 00.237-.237.281.281 0 00-.038-.171l-.312-1.182a.474.474 0 01.171-.535C22.864 17.543 24 16.009 24 14.765c0-2.874-2.737-5.204-6.165-5.204zm-2.197 4.006a.784.784 0 110 1.57.784.784 0 010-1.57zm2.197 0a.784.784 0 110 1.57.784.784 0 010-1.57zm2.196 0a.784.784 0 110 1.57.784.784 0 010-1.57z"/>
            </svg>
          </div>
        </div>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn-item"
          aria-label={t.floating.whatsapp}
        >
          <div className="float-btn-label">{t.floating.whatsapp}</div>
          <div className="float-btn-circle bg-[#25D366] hover:bg-[#1ebe5d] transition-colors">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        </a>
      </div>

      {/* WeChat QR Modal */}
      {wechatOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          onClick={() => setWechatOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{t.floating.wechat}</h3>
              <button onClick={() => setWechatOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* QR Code placeholder */}
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 text-green-500">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.328.328 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098A10.16 10.16 0 008.69 17.875c.04 0 .079-.002.118-.003-.062-.29-.092-.587-.092-.889 0-3.477 3.164-6.3 7.065-6.3.193 0 .386.008.578.025C15.304 5.166 12.261 2.188 8.691 2.188z"/>
                  </svg>
                </div>
                <p className="text-xs text-gray-500">WeChat QR Code</p>
                <p className="text-xs text-gray-400 mt-1">{WECHAT_ID}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Scan to chat with BLCOOF on WeChat</p>
            <p className="text-xs text-gray-400 mt-1">WeChat ID: <span className="font-semibold text-gray-700">{WECHAT_ID}</span></p>
          </div>
        </div>
      )}
    </>
  );
}
