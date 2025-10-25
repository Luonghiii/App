
import React, { useState, useEffect, useCallback, FC, useRef, useMemo } from 'react';
import {
  CheckIcon,
  UsersIcon,
  UserIcon,
  KeyIcon,
  ClockIcon,
  RocketIcon,
  AppStoreIcon,
  WarningIcon,
  TelegramIcon,
  FacebookIcon,
  ZaloIcon,
  BanIcon,
  ArrowRightIcon,
  ArchiveIcon,
  AppWindowIcon,
  GlobeIcon,
  FlagVNIcon,
  InfoIcon,
} from './components/icons';

interface Account {
  id: number;
  email: string;
  password_plain: string;
  nation: string;
  flag: string;
  lastUpdate: Date;
  status: string;
}

// --- TRANSLATIONS ---
const translations = {
  en: {
    // Header
    sponsoredBy: "Sponsored by",
    
    // Login Guide
    loginGuideTitle: "Login Instructions",
    loginGuideSubtitle: "Please read the instructions carefully before use",
    importantWarningTitle: "IMPORTANT WARNING",
    warning1: "ONLY SIGN IN TO THE APP STORE - Do not sign in to iCloud in Settings",
    warning2: "Signing in to iCloud can permanently lock your device",
    warning3: "Luonghiii is not responsible if you intentionally sign in to iCloud and your device gets locked",
    whatNotToDoTitle: "Absolutely Do Not",
    notToDo1: "Do not sign in to iCloud in Settings (Will cause the device to be permanently locked)",
    notToDo2: "Do not turn on Find My iPhone/iPad",
    notToDo3: "Do not sync personal data with this account",
    step1Title: "Open App Store to Sign In ID",
    step1_1: "Open",
    step1_2: "App Store",
    step1_3: "Press",
    step1_4: "avatar in the top right corner",
    step1_logout_title: "Log out of the old account first:",
    step1_logout_1: "Scroll to the bottom to find the sign-out button",
    step1_logout_2: "Select 'Sign Out'",
    step1_login_title: "Then sign in with the new account:",
    step1_login_1: "Scroll back to the top",
    step1_login_2: "Select 'Sign In'",
    step1_login_3: "Select 'Not ... ?' (if available)",
    step1_login_4: "Enter the new account information",
    step2Title: "Skip 'Apple ID Security'",
    step2Subtitle: "When you press sign in, to avoid getting stuck with phone number verification, 'do not press continue'",
    step2_1: "Select 'Other Options'",
    step2_2: "Select 'Don't Upgrade'",
    step3Title: "How to Download Apps/Games Correctly",
    step3Subtitle: "After successful login, follow these steps",
    step3_iphone_high: "For newer iPhones:",
    step3_iphone_high_action: "Select 'Apps' section",
    step3_iphone_low: "For older iPhones:",
    step3_iphone_low_action: "Select 'Purchased' section",
    step3_warning: "Don't go into 'Purchase History', there's nothing there, you won't find it and then complain.",
    step3_tip: "Find the App you need to download, if downloading Shadowrocket costs $2.99, just go ahead and buy it, it will download automatically (Don't worry, you won't be charged). If it doesn't work, switch to another account that has Shadowrocket.",

    // AccountListSummary
    accountListTitle: "List of Accounts",
    activeAccounts: "Active Account",

    // AccountCard
    appleAccount: "Apple Account",
    status: "Status",
    work: "Work",
    nation: "Nation",
    update: "Update",

    // Direct Download Card
    directDownloadTitle: "Direct App Downloads",
    directDownloadNote: "Note: These installation links only work on iPhone/iPad.",
    deleteOldAppNote: "Important: Before installing, please delete the old version of the app from your device.",
    install: "Install",
    shadowrocket: "App Shadowrocket",
    locket: "App Locket",

    // CopyButton
    copyAccount: "Account",
    copyPassword: "Password",
    copied: "Copied",
    copyAccountSuccess: "Account copied successfully",
    copyPasswordSuccess: "Password copied successfully",

    // LuonghiiiCard
    luonghiiiDescription: "Specializing in providing the most reputable premium social media accounts.",

    // Time Ago
    secondsAgo: "seconds ago",
    minutesAgo: "minutes ago",
    hoursAgo: "hours ago",
    daysAgo: "days ago",

    // Footer & Policies
    copyright: "Copyright © Luonghiii",
    footerRights: "© 2025 Luonghiii - Appstore. All rights reserved",
    privacyPolicy: "Privacy Policy",
    termOfService: "Term of Service",
    privacyPolicyTitle: "Privacy Policy",
    privacyPolicyContent: `
      <p><strong>Last Updated: 2024</strong></p>
      <p>This Privacy Policy describes how we handle information when you use our service.</p>
      <h3 class="font-bold mt-4 mb-2">1. Information We Do Not Collect</h3>
      <p>We do not collect, store, or share any personal information from visitors to our website. Your visit is completely anonymous.</p>
      <h3 class="font-bold mt-4 mb-2">2. Use of Provided Accounts</h3>
      <p>The Apple ID accounts provided are for temporary use to download applications from the App Store only. You are strictly advised not to:</p>
      <ul class="list-disc list-inside ml-4">
        <li>Sign in to iCloud with these accounts.</li>
        <li>Sync any personal data, including contacts, photos, or documents.</li>
        <li>Enable 'Find My iPhone/iPad'.</li>
      </ul>
      <p class="mt-2">We are not responsible for any personal data loss or device issues resulting from improper use of these accounts.</p>
      <h3 class="font-bold mt-4 mb-2">3. Cookies</h3>
      <p>Our website does not use cookies for tracking or collecting personal data.</p>
      <h3 class="font-bold mt-4 mb-2">4. Changes to This Policy</h3>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
    `,
    termsOfServiceTitle: "Terms of Service",
    termsOfServiceContent: `
      <p><strong>Last Updated: 2024</strong></p>
      <p>By using this service, you agree to the following terms and conditions:</p>
      <h3 class="font-bold mt-4 mb-2">1. Service Description</h3>
      <p>This service provides temporary access to Apple ID accounts for the sole purpose of downloading applications from the Apple App Store.</p>
      <h3 class="font-bold mt-4 mb-2">2. Proper Usage</h3>
      <p>You agree to use the provided accounts only for logging into the App Store. You must not attempt to log into iCloud or any other Apple services. This is critical to prevent device locking and to protect your own data.</p>
      <h3 class="font-bold mt-4 mb-2">3. Disclaimer of Liability</h3>
      <p>The service is provided "as is". We are not liable for any damages, including but not to, data loss, device locking (e.g., iCloud lock), or any other issues that may arise from the use or misuse of the provided accounts. You use this service at your own risk.</p>
      <h3 class="font-bold mt-4 mb-2">4. No Warranty</h3>
      <p>We do not guarantee that every account will have a specific application available for download. Account availability and functionality may change without notice.</p>
      <h3 class="font-bold mt-4 mb-2">5. Prohibited Actions</h3>
      <p>You are prohibited from changing the password, security questions, or any other information associated with the provided accounts. You must not make any purchases or add any payment methods.</p>
    `,
    close: "Close",

    // Instruction Modal
    instructionModalGotIt: "Got it, hide",
    instructionModalNext: "Next",
    instructionModalFinish: "Finish",
  },
  vi: {
    // Header
    sponsoredBy: "Tài trợ bởi",

    // Login Guide
    loginGuideTitle: "Hướng Dẫn Đăng Nhập",
    loginGuideSubtitle: "Vui lòng đọc kỹ hướng dẫn trước khi sử dụng",
    importantWarningTitle: "CẢNH BÁO QUAN TRỌNG",
    warning1: "CHỈ ĐĂNG NHẬP VÀO APP STORE - Không được đăng nhập vào iCloud trong Cài đặt",
    warning2: "Đăng nhập iCloud có thể khiến thiết bị bị khóa vĩnh viễn",
    warning3: "Luonghiii không chịu trách nhiệm nếu bạn cố tình đăng nhập iCloud bị khóa máy",
    whatNotToDoTitle: "Tuyệt Đối Không Làm",
    notToDo1: "Không đăng nhập vào iCloud trong Cài đặt (Sẽ khiến máy bị khóa vĩnh viễn)",
    notToDo2: "Không bật Find My iPhone/iPad",
    notToDo3: "Không đồng bộ dữ liệu cá nhân với tài khoản này",
    step1Title: "Mở App Store để Đăng Nhập ID",
    step1_1: "Mở",
    step1_2: "App Store",
    step1_3: "Nhấn",
    step1_4: "avatar ở góc trên bên phải",
    step1_logout_title: "Đăng xuất tài khoản cũ trước:",
    step1_logout_1: "Lướt xuống cuối sẽ có nút đăng xuất",
    step1_logout_2: "Chọn 'Đăng xuất' hoặc 'Sign Out'",
    step1_login_title: "Sau đó đăng nhập tài khoản mới:",
    step1_login_1: "Lướt lên trên lại trên đầu",
    step1_login_2: "Chọn 'Đăng nhập'",
    step1_login_3: "Chọn 'Không phải “...” ?' (nếu có)",
    step1_login_4: "Nhập thông tin tài khoản mới vào",
    step2Title: "Bỏ Qua 'Bảo Mật Tài Khoản Apple'",
    step2Subtitle: "Khi bấm đăng nhập tránh bị dính xác minh sđt 'không được bấm tiếp tục'",
    step2_1: "Chọn 'Các lựa Chọn Khác' (Other Options)",
    step2_2: "Chọn 'Không nâng cấp' (Don't Upgrade)",
    step3Title: "Cách Tải App/Game Đúng Cách",
    step3Subtitle: "Sau khi đăng nhập thành công, thì làm theo",
    step3_iphone_high: "Đối với iPhone đời cao:",
    step3_iphone_high_action: "Chọn mục 'Ứng dụng'",
    step3_iphone_low: "Đối với iPhone đời thấp:",
    step3_iphone_low_action: "Chọn mục 'Đã mua'",
    step3_warning: "Đừng có vào 'Lịch sử mua hàng' chả có gì trong đó đâu, tìm không thấy rồi than thở.",
    step3_tip: "Tìm App mình cần để tải, nếu tải shadowrocket mà mất 2.99$ thì cứ cắm vào mua luôn nó sẽ tự tải về (Ko mất tiền đâu mà lo), nếu không được đổi tài khoản khác có shadowrocket thì tải.",
    
    // AccountListSummary
    accountListTitle: "Danh sách tài khoản",
    activeAccounts: "Tài khoản hoạt động",
    
    // AccountCard
    appleAccount: "Tài khoản Apple",
    status: "Trạng thái",
    work: "Hoạt động",
    nation: "Quốc gia",
    update: "Cập nhật",
    
    // Direct Download Card
    directDownloadTitle: "Tải Ứng Dụng Trực Tiếp",
    directDownloadNote: "Lưu ý: Các liên kết cài đặt này chỉ hoạt động trên iPhone/iPad.",
    deleteOldAppNote: "Quan trọng: Trước khi cài đặt, vui lòng xoá phiên bản cũ của ứng dụng khỏi thiết bị.",
    install: "Cài đặt",
    shadowrocket: "App Shadowrocket",
    locket: "App Locket",

    // CopyButton
    copyAccount: "Tài khoản",
    copyPassword: "Mật khẩu",
    copied: "Đã sao chép",
    copyAccountSuccess: "Đã sao chép tài khoản",
    copyPasswordSuccess: "Đã sao chép mật khẩu",

    // LuonghiiiCard
    luonghiiiDescription: "Chuyên cung cấp các loại tài khoản preminum mạng xã hội uy tín nhất hiện tại",

    // Time Ago
    secondsAgo: "giây trước",
    minutesAgo: "phút trước",
    hoursAgo: "giờ trước",
    daysAgo: "ngày trước",

    // Footer & Policies
    copyright: "Bản quyền © Luonghiii",
    footerRights: "© 2025 Luonghiii - Appstore. Mọi quyền được bảo lưu",
    privacyPolicy: "Chính sách Bảo mật",
    termOfService: "Điều khoản Dịch vụ",
    privacyPolicyTitle: "Chính sách Bảo mật",
    privacyPolicyContent: `
      <p><strong>Cập nhật lần cuối: 2024</strong></p>
      <p>Chính sách Bảo mật này mô tả cách chúng tôi xử lý thông tin khi bạn sử dụng dịch vụ của chúng tôi.</p>
      <h3 class="font-bold mt-4 mb-2">1. Thông tin chúng tôi không thu thập</h3>
      <p>Chúng tôi không thu thập, lưu trữ hoặc chia sẻ bất kỳ thông tin cá nhân nào từ khách truy cập trang web của chúng tôi. Chuyến thăm của bạn hoàn toàn ẩn danh.</p>
      <h3 class="font-bold mt-4 mb-2">2. Sử dụng tài khoản được cung cấp</h3>
      <p>Các tài khoản Apple ID được cung cấp chỉ dành cho mục đích sử dụng tạm thời để tải xuống ứng dụng từ App Store. Bạn được khuyến cáo nghiêm ngặt không:</p>
      <ul class="list-disc list-inside ml-4">
        <li>Đăng nhập vào iCloud bằng các tài khoản này.</li>
        <li>Đồng bộ hóa bất kỳ dữ liệu cá nhân nào, bao gồm danh bạ, ảnh hoặc tài liệu.</li>
        <li>Bật 'Tìm iPhone/iPad'.</li>
      </ul>
      <p class="mt-2">Chúng tôi không chịu trách nhiệm cho bất kỳ mất mát dữ liệu cá nhân hoặc sự cố thiết bị nào phát sinh từ việc sử dụng không đúng cách các tài khoản này.</p>
      <h3 class="font-bold mt-4 mb-2">3. Cookies</h3>
      <p>Trang web của chúng tôi không sử dụng cookie để theo dõi hoặc thu thập dữ liệu cá nhân.</p>
      <h3 class="font-bold mt-4 mb-2">4. Thay đổi chính sách này</h3>
      <p>Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Mọi thay đổi sẽ được đăng trên trang này.</p>
    `,
    termsOfServiceTitle: "Điều khoản Dịch vụ",
    termsOfServiceContent: `
      <p><strong>Cập nhật lần cuối: 2024</strong></p>
      <p>Bằng cách sử dụng dịch vụ này, bạn đồng ý với các điều khoản và điều kiện sau:</p>
      <h3 class="font-bold mt-4 mb-2">1. Mô tả dịch vụ</h3>
      <p>Dịch vụ này cung cấp quyền truy cập tạm thời vào tài khoản Apple ID với mục đích duy nhất là tải xuống các ứng dụng từ Apple App Store.</p>
      <h3 class="font-bold mt-4 mb-2">2. Sử dụng đúng cách</h3>
      <p>Bạn đồng ý chỉ sử dụng các tài khoản được cung cấp để đăng nhập vào App Store. Bạn không được cố gắng đăng nhập vào iCloud hoặc bất kỳ dịch vụ nào khác của Apple. Điều này rất quan trọng để ngăn chặn việc khóa thiết bị và để bảo vệ dữ liệu của chính bạn.</p>
      <h3 class="font-bold mt-4 mb-2">3. Tuyên bố từ chối trách nhiệm</h3>
      <p>Dịch vụ được cung cấp "nguyên trạng". Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào, bao gồm nhưng không giới hạn ở việc mất dữ liệu, khóa thiết bị (ví dụ: khóa iCloud), hoặc bất kỳ vấn đề nào khác có thể phát sinh từ việc sử dụng hoặc lạm dụng các tài khoản được cung cấp. Bạn sử dụng dịch vụ này với rủi ro của riêng mình.</p>
      <h3 class="font-bold mt-4 mb-2">4. Không bảo hành</h3>
      <p>Chúng tôi không đảm bảo rằng mọi tài khoản sẽ có một ứng dụng cụ thể để tải xuống. Tính khả dụng và chức năng của tài khoản có thể thay đổi mà không cần thông báo trước.</p>
      <h3 class="font-bold mt-4 mb-2">5. Hành vi bị cấm</h3>
      <p>Bạn bị cấm thay đổi mật khẩu, câu hỏi bảo mật hoặc bất kỳ thông tin nào khác liên quan đến các tài khoản được cung cấp. Bạn không được thực hiện bất kỳ giao dịch mua hàng nào hoặc thêm bất kỳ phương thức thanh toán nào.</p>
    `,
    close: "Đóng",

     // Instruction Modal
    instructionModalGotIt: "Đã hiểu, ẩn đi",
    instructionModalNext: "Tiếp theo",
    instructionModalFinish: "Hoàn thành",
  }
};
type Language = 'vi' | 'en';
type Translation = typeof translations[Language];


// Data for the account card, designed to be easily expandable
const initialAccounts: Account[] = [
    {
        id: 1,
        email: 'luonghiii@icloud.com',
        password_plain: 'Luong@07',
        nation: 'Việt Nam',
        flag: '🇻🇳',
        lastUpdate: new Date(),
        status: 'Work',
    },
];

// Helper function to format time difference
const formatTimeAgo = (date: Date, lang: Language, now: Date): string => {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const t = translations[lang];

  if (seconds < 60) return `${Math.max(0, seconds)} ${t.secondsAgo}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${t.minutesAgo}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${t.hoursAgo}`;
  const days = Math.floor(hours / 24);
  return `${days} ${t.daysAgo}`;
};

// Reusable component for the glowing card effect
const GlowingBorderCard: FC<{ children: React.ReactNode; className?: string, contentClassName?: string }> = ({
  children,
  className = '',
  contentClassName = ''
}) => {
  return (
    <div className={`animated-border rounded-2xl p-0.5 shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] ${className}`}>
      <div className={`rounded-[15px] bg-[#161b22] ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

// Reusable component for scroll animations
const AnimatedSection: FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            {children}
        </div>
    );
};


const Header: FC<{t: Translation}> = ({t}) => (
    <header className="flex flex-col items-center text-center space-y-4 mt-8 mb-4 pt-10">
        <div className="relative w-24 h-24 rounded-3xl shadow-lg shadow-blue-500/30">
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="App Logo" className="w-full h-full rounded-3xl object-cover" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Luonghiii</h1>
        <p className="text-sm text-slate-500">{t.sponsoredBy} <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-400 hover:underline">Luonghiii</a></p>
    </header>
);

const LoginGuide: FC<{t: Translation; language: Language}> = ({t, language}) => {
    return (
        <div className="space-y-6">
            <header className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-20 h-20 rounded-3xl shadow-lg shadow-blue-500/30">
                    <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Login Guide Icon" className="w-full h-full rounded-3xl object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{t.loginGuideTitle}</h2>
                <p className="text-slate-400">{t.loginGuideSubtitle}</p>
            </header>

            <div className="bg-[#44222a] border border-red-500/50 rounded-2xl p-4 space-y-3">
                <h3 className="flex items-center gap-2 font-bold text-red-400">
                    <WarningIcon className="w-5 h-5"/>
                    {t.importantWarningTitle}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-1">
                    <li><span className="font-semibold">{t.warning1.split(' - ')[0]}</span> - {t.warning1.split(' - ')[1]}</li>
                    <li>{t.warning2}</li>
                    <li>{t.warning3}</li>
                </ul>
            </div>
            
            <div className="bg-[#292524] border border-slate-700 rounded-2xl p-4 space-y-3">
                 <h3 className="flex items-center gap-2 font-bold text-orange-400">
                    <BanIcon className="w-5 h-5"/>
                    {t.whatNotToDoTitle}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 pl-1">
                    <li>{t.notToDo1}</li>
                    <li>{t.notToDo2}</li>
                    <li>{t.notToDo3}</li>
                </ul>
            </div>

            <div className="space-y-4">
                <GlowingBorderCard className="shadow-purple-500/30" contentClassName="p-4 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">1</div>
                    <div className="ml-2">
                         <h3 className="font-bold text-white mb-3 ml-4">{t.step1Title}</h3>
                         <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <span>{t.step1_1}</span>
                                <img src="https://i.ibb.co/mCGLzdCP/IMG-8818.jpg" alt="App Store" className="w-5 h-5 rounded-md" />
                                <span className="font-semibold">{t.step1_2}</span>
                                {language === 'vi' && <span>lên</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <ArrowRightIcon className="w-4 h-4 text-purple-400"/>
                                <span>{t.step1_3}</span>
                                <UserIcon className="w-5 h-5 text-blue-400"/>
                                <span className="font-semibold">{t.step1_4}</span>
                            </div>

                            <div className="bg-[#44222a] border border-red-500/50 rounded-lg p-3 space-y-2">
                                <h4 className="font-semibold text-red-300 text-sm flex items-center gap-2">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                    {t.step1_logout_title}
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-4">
                                    <li>{t.step1_logout_1}</li>
                                    <li>{t.step1_logout_2}</li>
                                </ul>
                            </div>
                            <div className="bg-[#164e3b] border border-green-500/50 rounded-lg p-3 space-y-2">
                                 <h4 className="font-semibold text-green-300 text-sm flex items-center gap-2">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                    {t.step1_login_title}
                                 </h4>
                                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-4">
                                    <li>{t.step1_login_1}</li>
                                    <li>{t.step1_login_2}</li>
                                    <li>{t.step1_login_3}</li>
                                    <li>{t.step1_login_4}</li>
                                </ul>
                            </div>
                         </div>
                    </div>
                </GlowingBorderCard>

                <GlowingBorderCard className="shadow-teal-500/30" contentClassName="p-4 relative">
                     <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">2</div>
                     <div className="ml-2">
                        <h3 className="font-bold text-white mb-2 ml-4">{t.step2Title}</h3>
                        <p className="text-sm text-slate-400 mb-3 ml-4">{t.step2Subtitle}</p>
                        <div className="bg-[#164e3b] border border-green-500/50 rounded-lg p-3 space-y-2 text-sm text-slate-300">
                            <p>1 <ArrowRightIcon className="w-4 h-4 inline-block mx-1 text-green-400"/> {t.step2_1}</p>
                            <p>2 <ArrowRightIcon className="w-4 h-4 inline-block mx-1 text-green-400"/> {t.step2_2}</p>
                        </div>
                     </div>
                </GlowingBorderCard>

                <GlowingBorderCard className="shadow-amber-500/30" contentClassName="p-4 relative">
                     <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">3</div>
                     <div className="ml-2">
                        <h3 className="font-bold text-white mb-2 ml-4">{t.step3Title}</h3>
                        <p className="text-sm text-slate-400 mb-3 ml-4">{t.step3Subtitle}</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <AppWindowIcon className="w-5 h-5 text-sky-400"/>
                                <span className="font-semibold">{t.step3_iphone_high}</span>
                                <span>{t.step3_iphone_high_action}</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm text-slate-300">
                                <ArchiveIcon className="w-5 h-5 text-sky-400"/>
                                <span className="font-semibold">{t.step3_iphone_low}</span>
                                <span>{t.step3_iphone_low_action}</span>
                            </div>

                            <div className="bg-[#44222a] border border-red-500/50 rounded-lg p-3">
                                 <p className="text-sm text-red-300 flex items-start gap-2">
                                    <WarningIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>
                                    <span>{t.step3_warning}</span>
                                </p>
                            </div>

                            <div className="bg-[#164e3b] border border-green-500/50 rounded-lg p-3">
                                 <p className="text-sm text-green-300 flex items-start gap-2">
                                    <UsersIcon className="w-5 h-5 flex-shrink-0 mt-0.5"/>
                                    <span>{t.step3_tip}</span>
                                </p>
                            </div>
                        </div>
                     </div>
                </GlowingBorderCard>
            </div>
        </div>
    );
};


const AccountListSummary: FC<{ dateTime: string, t: Translation, totalActiveAccounts: number, nationStats: {flag: string, count: number}[] }> = ({ dateTime, t, totalActiveAccounts, nationStats }) => (
    <GlowingBorderCard
        className="shadow-fuchsia-500/30"
        contentClassName="p-6"
    >
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-100">{t.accountListTitle}</h1>
            <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-500">
            {dateTime}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-green-300 bg-green-500/10 border border-green-500/30 rounded-full">
            <CheckIcon className="w-4 h-4" />
            <span>{totalActiveAccounts} {t.activeAccounts}</span>
            </div>
            <div className="flex justify-center items-center gap-4 pt-2 flex-wrap">
            {nationStats.map(({ flag, count }) => (
                <div key={flag} className="flex items-center gap-1.5 px-3 py-1 bg-slate-700/50 rounded-full text-sm">
                <span>{flag}</span>
                <span className="font-semibold text-slate-200">{count}</span>
                </div>
            ))}
            </div>
        </div>
    </GlowingBorderCard>
);

const CopyButton: FC<{ textToCopy: string, label: string; icon: React.ReactElement; t: Translation; onCopy: () => void }> = ({ textToCopy, label, icon, t, onCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            onCopy();
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [textToCopy, onCopy]);

    return (
        <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl transition-all duration-300 font-semibold text-sm backdrop-blur-md ${isCopied ? 'bg-emerald-500 text-white' : 'bg-white/10 border border-white/20 hover:bg-white/20 text-slate-200'}`}
        >
            {isCopied ? <CheckIcon className="w-5 h-5" /> : icon}
            <span>{isCopied ? t.copied : label}</span>
        </button>
    );
}

const AccountCard: FC<{ account: Account, t: Translation, language: Language, onCopySuccess: (message: string) => void, currentTime: Date }> = ({ account, t, language, onCopySuccess, currentTime }) => {
  const timeAgo = useMemo(() => {
    return formatTimeAgo(account.lastUpdate, language, currentTime);
  }, [account.lastUpdate, language, currentTime]);

  return (
    <GlowingBorderCard
      className="shadow-fuchsia-500/30"
      contentClassName="p-5 relative"
    >
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-[#161b22]">
        {account.id}
      </div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-slate-100">{t.appleAccount}</h2>
        <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-green-300 bg-green-500/10 border border-green-500/30 rounded-full">
          <CheckIcon className="w-3 h-3" />
          <span>{t.work}</span>
        </div>
      </div>
      <p className="text-center font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-5">
        {account.email}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <CopyButton t={t} textToCopy={account.email} label={t.copyAccount} icon={<UserIcon className="w-5 h-5"/>} onCopy={() => onCopySuccess(t.copyAccountSuccess)} />
        <CopyButton t={t} textToCopy={account.password_plain} label={t.copyPassword} icon={<KeyIcon className="w-5 h-5"/>} onCopy={() => onCopySuccess(t.copyPasswordSuccess)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
            <FlagVNIcon className="w-5 h-5 text-slate-400" />
            <div>
                <p className="text-xs text-slate-400">{t.nation}</p>
                <p className="text-sm font-semibold text-slate-200">{account.nation}</p>
            </div>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-slate-400" />
            <div>
                <p className="text-xs text-slate-400">{t.update}</p>
                <p className="text-sm font-semibold text-slate-200">{timeAgo}</p>
            </div>
        </div>
      </div>
    </GlowingBorderCard>
  );
};

const DirectDownloadCard: FC<{ t: Translation }> = ({ t }) => {
    const handleInstall = (url: string) => {
        window.location.href = url;
    };
    
    return (
    <GlowingBorderCard
        className="shadow-cyan-500/30"
        contentClassName="p-6"
    >
        <div className="space-y-4">
             <h2 className="text-xl font-bold text-slate-100 mb-4">{t.directDownloadTitle}</h2>
             <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-2 text-sm text-slate-400">
                <InfoIcon className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                <span>{t.directDownloadNote}</span>
             </div>
             <div className="bg-amber-900/50 border border-amber-500/50 p-3 rounded-lg flex items-start gap-2 text-sm text-amber-300">
                <WarningIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                <span>{t.deleteOldAppNote}</span>
             </div>
            <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/q322N0H9/IMG-8793.jpg" alt={t.locket} className="w-10 h-10 rounded-lg object-cover" />
                    <p className="font-semibold text-slate-200">{t.locket}</p>
                </div>
                <button 
                   onClick={() => handleInstall("itms-services://?action=download-manifest&url=https://luongdz.vercel.app/Plist/Locket.plist")}
                   onContextMenu={(e) => e.preventDefault()}
                   style={{ WebkitTouchCallout: 'none', userSelect: 'none' } as React.CSSProperties}
                   className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors text-sm">
                    {t.install}
                </button>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/dsq5Q1W3/IMG-8789.png" alt={t.shadowrocket} className="w-10 h-10 rounded-lg object-cover" />
                    <p className="font-semibold text-slate-200">{t.shadowrocket}</p>
                </div>
                <button 
                   onClick={() => handleInstall("itms-services://?action=download-manifest&url=https://luongdz.vercel.app/Plist/Shadowrocket.plist")}
                   onContextMenu={(e) => e.preventDefault()}
                   style={{ WebkitTouchCallout: 'none', userSelect: 'none' } as React.CSSProperties}
                   className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors text-sm">
                    {t.install}
                </button>
            </div>
        </div>
    </GlowingBorderCard>
    );
};

const LuonghiiiCard: FC<{t: Translation}> = ({t}) => (
    <GlowingBorderCard
        className="shadow-rose-500/30"
        contentClassName="p-6"
    >
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full">
                <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Luonghiii" className="w-full h-full rounded-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-white">Luonghiii</h2>
            <p className="text-sm text-slate-400 max-w-xs">
                {t.luonghiiiDescription}
            </p>
            <div className="flex justify-center items-center gap-3 pt-2">
                <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><GlobeIcon className="w-5 h-5" /></a>
                <a href="https://t.me/luonghiii1" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><TelegramIcon className="w-5 h-5" /></a>
                <a href="https://facebook.com/luonghiii" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><FacebookIcon className="w-5 h-5" /></a>
                <a href="https://zalo.me/0916508081" target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-slate-300 transition-colors"><ZaloIcon className="w-5 h-5" /></a>
            </div>
        </div>
    </GlowingBorderCard>
);

const LanguageSwitcher: FC<{ language: Language, setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
      setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    return (
        <div className="absolute top-5 right-5 z-[60]">
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-slate-300 hover:bg-white/20 transition-colors backdrop-blur-md">
                {language === 'vi' ? (
                  <><span>🇻🇳</span></>
                ) : (
                  <><span>🇺🇸</span></>
                )}
            </button>
        </div>
    );
};

const PolicyModal: FC<{ title: string, content: string, isOpen: boolean, onClose: () => void, t: Translation }> = ({ title, content, isOpen, onClose, t }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-[#161b22] border border-slate-700 rounded-2xl shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                </header>
                <main className="p-6 text-slate-300 text-sm space-y-2 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }} />
                <footer className="p-4 border-t border-slate-700 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors">
                        {t.close}
                    </button>
                </footer>
            </div>
        </div>
    );
};

const Footer: FC<{t: Translation, onPrivacyClick: () => void, onTermsClick: () => void}> = ({ t, onPrivacyClick, onTermsClick }) => (
    <footer className="w-full max-w-md md:max-w-xl text-center text-slate-500 text-xs space-y-3 mt-4 mb-8">
        <p>{t.copyright}</p>
        <p>{t.footerRights}</p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
            <span>v1.0.1</span>
            <span className="text-slate-600">•</span>
            <button onClick={onPrivacyClick} className="hover:text-slate-300 underline">{t.privacyPolicy}</button>
            <span className="text-slate-600">•</span>
            <button onClick={onTermsClick} className="hover:text-slate-300 underline">{t.termOfService}</button>
        </div>
    </footer>
);

const Toast: FC<{ message: string; isVisible: boolean; onClose: () => void }> = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
            <div className="flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                <CheckIcon className="w-4 h-4" />
                <span>{message}</span>
            </div>
        </div>
    );
};

const InstructionModal: FC<{ isOpen: boolean; onClose: () => void; t: Translation; language: Language; }> = ({ isOpen, onClose, t, language }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = useCallback(() => {
        const el = contentRef.current;
        if (el) {
            const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
            setIsAtEnd(atEnd);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
             setTimeout(checkScrollPosition, 100);
        }
    }, [isOpen, checkScrollPosition]);

    const handleNext = () => {
        const el = contentRef.current;
        if (!el) return;

        if (isAtEnd) {
            onClose();
            return;
        }
        
        const nextScrollTop = el.scrollTop + el.clientHeight * 0.8;
        el.scrollTo({ top: nextScrollTop, behavior: 'smooth' });

        if (nextScrollTop + el.clientHeight >= el.scrollHeight - 20) {
            setIsAtEnd(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
            <div className="bg-[#161b22] border border-slate-700 rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <main ref={contentRef} onScroll={checkScrollPosition} className="p-1 md:p-2 overflow-y-auto">
                   <div className="p-4 md:p-6">
                    <LoginGuide t={t} language={language} />
                   </div>
                </main>
                <footer className="p-4 border-t border-slate-700 flex justify-between items-center flex-shrink-0">
                    <button onClick={onClose} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors text-sm">
                        {t.instructionModalGotIt}
                    </button>
                    <button onClick={handleNext} className="px-5 py-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 hover:bg-purple-500/30 rounded-lg text-white font-semibold transition-colors text-sm">
                        {isAtEnd ? t.instructionModalFinish : t.instructionModalNext}
                    </button>
                </footer>
            </div>
        </div>
    );
};

const LoadingScreen: FC = () => (
    <div className="bg-[#0d1117] text-white min-h-screen flex flex-col items-center justify-center">
        <style>{`
            @keyframes pulse-rocket {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-10px) scale(1.05); }
            }
            .animate-pulse-rocket { animation: pulse-rocket 2s ease-in-out infinite; }
        `}</style>
        <div className="relative w-24 h-24 rounded-3xl shadow-lg shadow-blue-500/30 animate-pulse-rocket">
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Loading Logo" className="w-full h-full rounded-3xl object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-6">Luonghiii</h1>
    </div>
);

const AnimatedGradientBackground: FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 w-full h-full z-0 overflow-hidden"
  >
    <div className="relative w-full h-full">
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob-1"></div>
      <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob-2"></div>
      <div className="absolute -bottom-16 left-8 w-72 h-72 bg-green-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob-3"></div>
    </div>
  </div>
);


const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'vi') ? savedLang : 'vi';
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [accountList, setAccountList] = useState<Account[]>(initialAccounts);
  const [showInstructionModal, setShowInstructionModal] = useState(false);

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);

    const instructionsSeenInSession = sessionStorage.getItem('instructionsSeen');
    if (!instructionsSeenInSession) {
        setShowInstructionModal(true);
        sessionStorage.setItem('instructionsSeen', 'true');
    }

    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    const refreshIntervalId = setInterval(() => {
        setAccountList(currentAccounts => 
            currentAccounts.map(acc => ({...acc, lastUpdate: new Date()}))
        );
    }, 30000); 

    return () => {
        clearTimeout(loadingTimer);
        clearInterval(timerId);
        clearInterval(refreshIntervalId);
    };
  }, []);

  const showToast = (message: string) => {
      setToast({ message, isVisible: true });
  };

  const formattedDateTime = useMemo(() => {
    const locale = language === 'vi' ? 'vi-VN' : 'en-GB';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(currentTime).replace(',', ' -').replace(/\//g, '/');
  }, [currentTime, language]);

  const totalActiveAccounts = accountList.length;
  const nationStats = [
    { flag: '🇻🇳', count: accountList.length },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="text-white min-h-screen font-sans p-4 flex flex-col items-center">
      <AnimatedGradientBackground />
      <div className="w-full max-w-md md:max-w-xl relative z-10">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <main className="w-full space-y-6">
            <AnimatedSection><Header t={t} /></AnimatedSection>
            <AnimatedSection><AccountListSummary dateTime={formattedDateTime} t={t} totalActiveAccounts={totalActiveAccounts} nationStats={nationStats} /></AnimatedSection>
            {accountList.map((acc, index) => (
              <AnimatedSection key={acc.id}>
                <AccountCard 
                  account={{...acc, id: index + 1}} 
                  t={t} 
                  language={language} 
                  onCopySuccess={showToast} 
                  currentTime={currentTime} 
                />
              </AnimatedSection>
            ))}
            <AnimatedSection><DirectDownloadCard t={t} /></AnimatedSection>
            <AnimatedSection><LuonghiiiCard t={t} /></AnimatedSection>
        </main>
        <AnimatedSection><Footer t={t} onPrivacyClick={() => setShowPrivacy(true)} onTermsClick={() => setShowTerms(true)} /></AnimatedSection>
      </div>
      
      <InstructionModal
        isOpen={showInstructionModal}
        onClose={() => setShowInstructionModal(false)}
        t={t}
        language={language}
      />
      <PolicyModal 
        title={t.privacyPolicyTitle} 
        content={t.privacyPolicyContent} 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
        t={t} 
      />
      <PolicyModal 
        title={t.termsOfServiceTitle} 
        content={t.termsOfServiceContent} 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        t={t} 
      />
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default App;
