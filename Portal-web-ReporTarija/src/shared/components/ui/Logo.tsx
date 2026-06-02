import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 161 151"
      className={cn("h-auto w-auto select-none", className)}
    >
      <defs>
        <linearGradient id="n_logo_grad_1" x1="31.19" x2="126.3" y1="60.3" y2="60.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#732024" offset="0"/>
          <stop stopColor="#B7332C" offset=".5"/>
          <stop stopColor="#C25638" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_2" x1="31.19" x2="109.4" y1="23.5" y2="23.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#732024" offset="0"/>
          <stop stopColor="#B7332C" offset=".5"/>
          <stop stopColor="#C25638" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_3" x1="34.52" x2="123.1" y1="58.2" y2="58.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A4A2A" offset="0"/>
          <stop stopColor="#66894E" offset=".5056"/>
          <stop stopColor="#83A856" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_4" x1="34.52" x2="103.6" y1="21.63" y2="21.63" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A4A2A" offset="0"/>
          <stop stopColor="#66894E" offset=".5056"/>
          <stop stopColor="#83A856" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_5" x1="86.57" x2="86.57" y1="88.51" y2="68.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#506E39" offset="0"/>
          <stop stopColor="#6B8F4C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_6" x1="50.44" x2="65.12" y1="85.4" y2="85.4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A4A2A" offset="0"/>
          <stop stopColor="#506E39" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_7" x1="50.44" x2="65.67" y1="94.15" y2="94.15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A4A2A" offset="0"/>
          <stop stopColor="#506E39" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_8" x1="105.1" x2="105.1" y1="96.61" y2="88.79" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B8F4C" offset="0"/>
          <stop stopColor="#506E39" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_9" x1="97" x2="107.2" y1="89.04" y2="71.75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A4A2A" offset="0"/>
          <stop stopColor="#6B8F4C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_10" x1="89.86" x2="97.92" y1="41.41" y2="41.41" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9A2926" offset="0"/>
          <stop stopColor="#C2332C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_11" x1="110" x2="116.2" y1="56.2" y2="56.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9A2926" offset="0"/>
          <stop stopColor="#C2332C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_12" x1="29.26" x2="77.59" y1="46.34" y2="46.34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78201F" offset="0"/>
          <stop stopColor="#982726" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_13" x1="103.9" x2="103.9" y1="81.25" y2="73.14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_14" x1="113.4" x2="113.4" y1="29.7" y2="23.66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CE3E2A" offset="0"/>
          <stop stopColor="#D4422A" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_15" x1="82.13" x2="97.7" y1="133.6" y2="133.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_16" x1="97.44" x2="111.7" y1="135.8" y2="135.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_17" x1="114.2" x2="123.5" y1="135.6" y2="135.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_18" x1="125.6" x2="130.1" y1="133.9" y2="133.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_19" x1="130.2" x2="138" y1="137.6" y2="137.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
        <linearGradient id="n_logo_grad_20" x1="140.5" x2="154.1" y1="136" y2="136" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B72F29" offset="0"/>
          <stop stopColor="#C7342C" offset="1"/>
        </linearGradient>
      </defs>

      {/* Escudo e isotipo de Tarija */}
      <path fill="url(#n_logo_grad_1)" d="m120.2 27.9c-0.2 0.7-0.5 1.4-0.9 1.8 3.1 2.5 5.4 6.8 5.4 11.7v40.1c0 5.1-2.6 10.3-7.1 13.1l-30.2 18.7c-2.4 1.5-5.3 2.7-8.6 2.7-2.6 0-5.3-0.6-8.5-2.4l-29.8-18.3c-4.1-2.5-7.6-7.6-7.7-13.8l0.1-17-1.7-0.9v17.9c0 6.3 3.3 12 8.3 14.8l30 18.3c2.9 1.6 5.9 2.9 9.5 3.1 2.9-0.2 5.9-0.6 9.3-2.5l30.1-18.4c5-2.7 7.9-8.5 7.9-14.4v-41c-0.1-5.5-2.6-10.5-6.1-13.5z"/>
      <path fill="url(#n_logo_grad_2)" d="m32.8 46.3v-4.9c0.1-5.3 3.1-10.6 8-13.5l29.9-17.7c2.5-1.4 4.6-1.9 7.8-2 2.9 0 5.6 0.4 8.3 1.9l21.3 12.5 1.3-1.2-21.6-12.5c-2.3-1.4-4.6-2.4-9.3-2.4-3.1 0-5.6 0.5-8.4 2.1l-30.3 17.9c-2.4 1.4-4.6 3.6-6.2 6.1h0.4l-0.5 0.1c-1.5 2.9-2.3 5.9-2.3 8.7v6.5l1.6-1.6z"/>
      <path fill="url(#n_logo_grad_3)" d="m118.3 31-1.6 1.3c2.1 2.1 4.1 5.1 4.1 9.5v39.5c0 4.4-2.3 8.2-6.2 11l-3.9-7.4-1.4 2 3.5 6.4-20.6 12.3-24.7-5.6-7.9 1.8-11.4-6.6 8-14.8h9.1v-1.8h-10.3l-8.5 15.6-3.6-2.1c-2.9-2-6.1-5.9-6.2-10.6v-16.8l-2.1-0.1-0.1 16.9c0.3 5 2.6 9.6 6.8 12.2l30.1 17.9c2.4 1.7 5.3 2.4 7.4 2.4 3.1 0 5.7-0.6 8-1.9l29.3-18.1c4.1-2.2 7-7.3 7-12.4v-39.8c-0.3-4.4-2.1-8.1-4.8-10.8zm-56.4 72.2 5.5-1.2 22.4 5-5.6 3.5c-3.7 1.6-8.3 2.2-11.9-0.1l-10.4-7.2z"/>
      <path fill="url(#n_logo_grad_4)" d="m36.7 44.7c-0.4-6.1 2.6-11.2 6.9-13.9l28.1-16.9c4.1-2.4 9.5-3.1 13.8-0.6l11.9 7 6.2 1.6-17.2-10c-2.5-1.4-4.9-2-7.8-2-2.4 0-4.9 0.6-7.2 1.7l-29.1 17c-4.7 2.4-7.7 7.3-7.8 12.9v4.1l2.2-0.9z"/>
      <path fill="url(#n_logo_grad_5)" d="m95.6 86.6v-3.8c-2.7-4.4-1.9-8.3 0-11.3l-0.8-0.3v-5.1l0.3-0.3h-0.4l-0.2-2.1-0.5 0.9-1.8-5.6v-0.4h0.3v-0.3h-0.4v-0.4h-0.4v0.4h-0.4v0.3h0.4v0.5l-1.7 5.5-0.7-0.9-0.2 2.1h-0.6l0.4 0.3v5.1l-0.6 0.5 0.3 0.6v3.1l-3-1.5v-3.4h-0.8l-3.6-2.4v-1.2h0.6v-0.5h-0.6v-0.6h-0.6v0.6h-0.5v0.5h0.5v1.2l-3.2 2.4-1.1 0.1v3.3l-2.7 1.2v-3.3l0.3-0.5-0.6-0.5v-4.8l0.3-0.2-0.5-0.3-0.3-1.9-0.5 0.4-0.9-1.5-2-0.8-1 2.5-0.8-0.4-0.1 1.8-0.5 0.3 0.3 0.2v4.8l-0.5 0.4v5.8h-0.3v9.6h-0.7v1.7h30.6v-1.8h-0.8zm-25.6-16.1h-1.2v-2.1c0-0.8 1.2-1 1.2 0v2.1zm2 0h-1.2v-2.1c0-0.8 1.2-1 1.2 0v2.1zm4 15.4-2-1.5v-1.9c0.3-1.4 2.1-1 2.1 0.2l-0.1 3.2zm3.4-11.1c0-1.8 3.1-2.4 3.2 0.1 0 1.8-3.2 2-3.2-0.1zm3.2 11.5h-3.4v-4.6c0.3-2.1 3.4-2.1 3.5-0.1l-0.1 4.7zm5.2-1.9-1.9 1.4v-3.2c0.1-1.3 2-1.6 2 0.1l-0.1 1.7zm3.7-13.9h-1v-2.1c0-0.8 1-1 1 0v2.1zm2 0h-0.9v-2.1c0-0.8 0.9-1 0.9 0v2.1z"/>
      <polygon fill="url(#n_logo_grad_6)" points="65.1 85.8 65.1 82.1 57.4 82.1 53.7 88.7 64.3 88.7 64.3 85.8"/>
      <polygon fill="url(#n_logo_grad_7)" points="53.1 90.2 50.4 94.5 56.7 98 63 95.3 65.7 90.2"/>
      <path className="fill-[#415930]" d="m58.4 98.8 1.6 1 6.7-1.5 1-7.7-3.1 5.7"/>
      <path className="fill-[#415930]" d="m68.6 98.3 10.8 2.5 3.5-3.5-13.5-5.7"/>
      <polygon className="fill-[#415930]" points="69.6 89.6 76.7 92.8 80.4 89.6"/>
      <polygon className="fill-[#415930]" points="78.5 93.6 84 95.9 88.5 92.1 82.8 89.6"/>
      <polygon className="fill-[#415930]" points="86.3 96.9 95.7 101.4 101.6 97.8 90.3 92.9"/>
      <polygon className="fill-[#415930]" points="81.4 101.2 91.6 103.7 94 102.4 84.4 98.3"/>
      <polygon className="fill-[#415930]" points="86.6 89.4 89.7 90.8 91.5 89.4"/>
      <path d="m94 89.6-2.3 2.1 6.4 2.6 3.1-2.7-1.4-2h-5.8zm14.2-0.8-4.4 5-1.5-0.9-2.6 2.1 3.7 1.6 7.1-4-2.3-3.8z" fill="url(#n_logo_grad_8)"/>
      <polygon className="fill-[#415930]" points="97.5 86.5 97.5 88.2 98.7 88.2"/>
      
      {/* Elementos internos del escudo */}
      <path className="fill-[#78201F]" d="m79.4 45.3c-1 0.3-1.1 1.6-0.1 1.7l5.6 1.7c1.8 0.4 2-1.5 0.5-1.8l-6-1.6z"/>
      <path className="fill-[#78201F]" d="m84.5 37.8-6.2 2c-1.2 0.6-0.6 2.2 0.6 1.8l6-2c1.7-0.4 1.3-2.4-0.4-1.8z"/>
      <path className="fill-[#78201F]" d="m78.1 31-3 4.4c-0.7 1.3 0.9 2.1 1.6 0.9l3-4.4c0.9-1-0.8-2.3-1.6-0.9z"/>
      <path className="fill-[#732824]" d="m114 50.9 0.2-19.5c5.6-0.8 5.8-9-0.6-9.6-2.2 0-3.5 1.1-4.8 2.9l-19.9-4.1c0.2-5.5-8.1-7.2-9.5-1-0.5 3 2.2 6.5 5.7 5.9l5.5 11.7c-3.3 2.2-3.1 8.7 2.9 9.4 1.6 0 2.9-0.5 4.5-1.4l10.7 8.5c-2.1 6.9 7.8 10.5 9.3 3.2 0.3-3-1.6-5.5-4-6z"/>
      <path className="fill-[#BC332E]" d="m113.4 23.7c-3.4 0-4.8 5.4 0 6 3.3 0 4.6-5.3 0-6z"/>
      <path d="m103.6 69c-4.7 0-8.2 3.9-8.1 8.1 0 5.3 8.1 14.9 8.1 14.9s8.5-9.6 8.5-14.1c0.4-4.8-3.5-8.9-8.5-8.9zm0 14.2c-3.1 0-6-2.6-6-5.9 0-2.9 2.6-5.9 6-6 3 0 6 2.6 6.1 6 0 3.1-2.6 5.9-6.1 5.9z" fill="url(#n_logo_grad_9)"/>
      <path className="fill-[#C0332C]" d="m103.6 73.3c-5 0.3-5.2 7.1 0 7.7 5 0.1 5.7-7.4 0-7.7z"/>
      <path d="m94 37.6c-4.9 0-5.6 7.5 0 7.6 5.1-0.2 5.1-7.3 0-7.6z" fill="url(#n_logo_grad_10)"/>
      <path className="fill-[#BC332E]" d="m84.1 17.6c-4.7 0.3-3.7 6.3 0 6 4-0.5 3.8-5.7 0-6z"/>
      <path d="m113.1 53c-4.6 0.7-4 6.2 0.3 6.4 4.1-0.2 4-6.4-0.3-6.4z" fill="url(#n_logo_grad_11)"/>
      <path d="m72.7 36.9c-2.2-3.9-5.3-8-8.7-7.5-1.4 0.2-2.1 2.5-3.1 3.6-2.3 3.1-5.7 5.7-9.3 8-4.9 3.1-9.7 3.9-16.8 6.4-1.2 0.5-1.8 1.5-2.2 2.5-1.8 0.7-3.5 1.2-3.3 5.2 0.7 5.3 3.3 8.5 7.2 7.5 1.1 0.8 2.4 1.3 4.5 0.3l6.5 9.7c1.4 2.4 4.7 1.1 8-0.3 1.1-0.9 1.6-3.9-0.1-5-1-0.6-2-1.7-3-2.7 3-2.5 1.6-3.6 0.3-5.6 3.9-0.9 9.7-1.4 18.9 1.5 6.7 3.9 8.5-3.8 3.8-16.9l-2.7-6.7zm-19 33.9-2.8 1.1c-0.8 0.2-1.6 0.2-2.3-1.1l-5.9-8.5 4.8-1.7 4 6.1 2.6 1.9c1.3 0.8 0.5 2-0.4 2.2z" fill="url(#n_logo_grad_12)"/>
      <path className="fill-[#BC332E]" d="m32.8 51.9c-1.2 0.2-2 1-1.7 3.5 0.3 3.3 2.3 6.3 4.6 5.5-1.6-2.2-2.8-6.2-2.9-9z"/>
      <path className="fill-[#BE322D]" d="m36.1 49c-1.5 0.4-2.2 1.6-1.6 3.6 0.9 4.3 2.6 10 5.1 8.8l9-3.3c-1.2-3-3.1-7.7-3.4-12.5l-9.1 3.4z"/>
      <path d="m46.6 45.4c0.4 4.3 2 8.2 3.8 12.5 5.1-1.6 13-1.8 19 0.2-4-5.2-7.8-15-8.2-23-3.7 4.5-9.3 8.5-14.6 10.3z" fill="#EBEBED"/>
      <path className="fill-[#BC332E]" d="m49.1 59.9 2 3.1 0.8 0.1c1.7-1 0.2-2.5-0.8-3.7l-2 0.5z"/>
      <path className="fill-[#BE322D]" d="m64.5 30.8c-2.4 0.6-1.1 8.2-0.4 10.1 6.4-2 9.6 8.7 3.4 10 1.1 2.7 5.6 11 8.1 8.5 3-3.8-3.2-28-11.1-28.6z"/>
      <path d="m64.6 42.4 2.4 7c4.4-2 0.9-8.3-2.4-7z" fill="#E1E1E1"/>
      <path d="m103.6 73.3c-4.7 0.1-5.2 6.6-0.2 7.8 5.6 0.3 5.6-7.5 0.2-7.8z" fill="url(#n_logo_grad_13)"/>
      <path d="m113.6 23.7c-3.6 0-4.5 5.4-0.2 6 3.5 0 4.2-5.3 0.2-6z" fill="url(#n_logo_grad_14)"/>

      {showText && (
        <>
          {/* Texto "repor" - Rojo en modo claro, Blanco en modo oscuro */}
          <path
            className="fill-[#B72F29] dark:fill-white transition-colors duration-200"
            d="m4.3 123h7.6c4.8 0 7.3 2 7.3 6 0 2.7-0.9 5-3.1 6.6l3.1 7.6h-4.7l-2.6-6.6h-3.7v6.6h-3.9v-20.2zm7.6 10.1c2 0 2.8-1.2 2.8-3.1 0-2-1-3.4-3-3.4h-3.6v6.5h3.8z"
          />
          <path
            className="fill-[#B72F29] dark:fill-white transition-colors duration-200"
            d="m21.6 136c0-5.1 2.5-8.1 6.9-8.1s6.9 1.8 6.9 6.6l-0.3 3.1h-9.4c0 1.8 1.4 2.6 2.9 2.6 1.9 0 3.8-0.1 6.1-0.5v2.9c-1.8 0.6-4.2 0.9-6.2 0.9-4.6 0.1-6.9-2.5-6.9-7.5zm9.5-1.5c0-2-0.6-3.1-2.6-3.4-2.1 0-2.9 1.3-2.9 3.4h5.5z"
          />
          <path
            className="fill-[#B72F29] dark:fill-white transition-colors duration-200"
            d="m38.4 128.1h4.2v1c0.9-0.5 2-1.2 3.9-1.2 3.9 0 6.1 1.6 6.1 7.7 0 6-2.2 7.9-6.7 7.9-1.2 0-2.5-0.3-3.3-0.5v5.9h-4.2v-20.8zm9.9 7.9c0-3-1.2-4.4-2.8-4.4-1 0-2.1 0.3-2.9 0.8v7.5c0.8 0.2 1.8 0.2 2.8 0.2 2.1 0 2.9-1.2 2.9-4.1z"
          />
          <path
            className="fill-[#B72F29] dark:fill-white transition-colors duration-200"
            d="m54.9 136c0-4.4 1.8-8.1 7.2-8.1 5.3 0 7.3 2.7 7.3 8.1 0 4.6-2 7.5-7.3 7.5-5 0-7.2-2.9-7.2-7.5zm10.2 0c0-2.9-0.7-4.4-3-4.6-2.1 0-3 1.6-3 4.2 0 2.5 0.9 4.6 3 4.5 2.3 0 3-1.2 3-4.1z"
          />
          <path
            className="fill-[#B72F29] dark:fill-white transition-colors duration-200"
            d="m72.4 128.1h3.8l0.2 2c1.1-1 3.3-2 4.7-2.2v4.2c-1.7 0.3-3.7 0.5-4.7 1.4v9.6h-4v-15z"
          />

          {/* Texto "Tarija" - Rojo en modo claro, Blanco en modo oscuro */}
          <path
            fill="url(#n_logo_grad_15)"
            className="dark:fill-white transition-colors duration-200"
            d="m87.6 126.4h-5.5v-3.4h15.6v3.5h-5.5v16.6h-4.6v-16.7z"
          />
          <path
            fill="url(#n_logo_grad_16)"
            className="dark:fill-white transition-colors duration-200"
            d="m97.4 138.7c0-3.3 2-4.3 7.7-4.6h1.3c0-1.5-0.3-2.5-1.8-2.7-1.7 0-4.2 0.2-6 0.3l-0.2-2.8c1.6-0.5 4-1 6.2-1 3.8 0 6 1.1 6 5.2v5.8c0 1 0.3 1.2 1.1 1.3v3.2h-1.8c-1.3 0-2.5-0.4-2.9-1.3-0.9 0.8-2.9 1.4-4.9 1.4-3.2 0-4.7-1.9-4.7-4.8zm9 0.9v-2.9h-1.3c-2.5 0.2-3.5 0.7-3.5 1.9 0 1.5 0.8 1.8 1.8 1.8s2.2-0.3 3-0.8z"
          />
          <path
            fill="url(#n_logo_grad_17)"
            className="dark:fill-white transition-colors duration-200"
            d="m114.2 128.1h4.2v2c1.1-1 3.3-2 5.1-2.2v4.5c-1.8 0-3.9 0.5-5.1 1.1v9.6h-4.2v-15z"
          />
          <path
            fill="url(#n_logo_grad_18)"
            className="dark:fill-white transition-colors duration-200"
            d="m125.6 122.4h4.3v3.7h-4.3v-3.7zm0 5.7h4.3v15h-4.3v-15z"
          />
          <path
            fill="url(#n_logo_grad_19)"
            className="dark:fill-white transition-colors duration-200"
            d="m130.2 145.9c1.8-0.3 3.2-1.5 3.3-3.2v-14.6h4.4v14.3c0 4.2-1.9 5.7-6.2 6.8l-1.5-3.3zm3.3-23.5h4.5v3.7h-4.5v-3.7z"
          />
          <path
            fill="url(#n_logo_grad_20)"
            className="dark:fill-white transition-colors duration-200"
            d="m140.5 138.7c0-3.3 2-4.3 7.9-4.6h0.5c0-1.5-0.3-2.5-1.8-2.7-1.6 0-3.7 0.2-5.4 0.3l-0.1-2.8c1.5-0.5 3.9-1 6-1 3.8 0 5.4 1.1 5.4 5.2v5.8c0 1 0.4 1.2 1.1 1.3v3.2h-1.7c-1.3 0-2.5-0.4-3-1.3-0.8 0.8-2.7 1.4-4.5 1.4-3 0.1-4.4-1.9-4.4-4.8zm8.4 0.9v-2.9h-0.5c-2.9 0-3.8 0.7-3.8 1.9 0 1.5 0.8 1.8 1.8 1.8s1.7-0.3 2.5-0.8z"
          />
        </>
      )}
    </svg>
  )
}
