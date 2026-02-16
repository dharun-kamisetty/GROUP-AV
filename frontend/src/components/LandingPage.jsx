import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    HeartIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ClockIcon,
    ArrowRightIcon,
    MicrophoneIcon,
    MapPinIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const stats = [
        {
            value: t('landing.stat1Value'),
            title: t('landing.stat1Title'),
            desc: t('landing.stat1Desc'),
            icon: UserGroupIcon,
            color: "blue"
        },
        {
            value: t('landing.stat2Value'),
            title: t('landing.stat2Title'),
            desc: t('landing.stat2Desc'),
            icon: ClockIcon,
            color: "orange"
        },
        {
            value: t('landing.stat3Value'),
            title: t('landing.stat3Title'),
            desc: t('landing.stat3Desc'),
            icon: HeartIcon,
            color: "red"
        }
    ];

    const features = [
        {
            title: t('landing.feature1Title'),
            description: t('landing.feature1Desc'),
            icon: HeartIcon,
            color: "text-red-500",
            bg: "bg-red-50"
        },
        {
            title: t('landing.feature2Title'),
            description: t('landing.feature2Desc'),
            icon: ShieldCheckIcon,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: t('landing.feature3Title'),
            description: t('landing.feature3Desc'),
            icon: MicrophoneIcon,
            color: "text-purple-500",
            bg: "bg-purple-50"
        },
        {
            title: t('landing.feature4Title'),
            description: t('landing.feature4Desc'),
            icon: MapPinIcon,
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            title: t('landing.feature5Title'),
            description: t('landing.feature5Desc'),
            icon: DocumentTextIcon,
            color: "text-orange-500",
            bg: "bg-orange-50"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white pt-16 pb-24">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-medium mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 relative mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {t('landing.badge')}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight max-w-5xl mx-auto">
                        {t('landing.heroTitle')}
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('landing.heroSubtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/app')}
                            className="btn-primary text-lg px-8 py-4 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-1"
                        >
                            {t('landing.startButton')}
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </button>
                        <button className="px-8 py-4 text-gray-600 font-medium hover:text-gray-900 transition-colors">
                            {t('landing.learnMoreButton')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-white border-y border-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${stat.color}-100 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">{stat.title}</div>
                                <p className="mt-2 text-gray-600">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('landing.featuresTitle')}</h2>
                        <p className="text-gray-600 text-lg">{t('landing.featuresSubtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('landing.feature6Title')}</h2>
                            <p className="text-xl text-blue-100 mb-10">{t('landing.feature6Subtitle')}</p>
                            <button
                                onClick={() => navigate('/app')}
                                className="bg-white text-primary-900 text-lg font-bold px-10 py-4 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                {t('landing.feature6Button')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                                <HeartIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{t('landing.footerTitle')}</h3>
                                <p className="text-sm text-gray-500">{t('landing.footerSubtitle')}</p>
                            </div>
                        </div>
                        <div className="flex gap-8 text-sm text-gray-600 font-medium">
                            <a href="#" className="hover:text-primary-600 transition-colors">{t('landing.footerPrivacy')}</a>
                            <a href="#" className="hover:text-primary-600 transition-colors">{t('landing.footerTerms')}</a>
                            <a href="#" className="hover:text-primary-600 transition-colors">{t('landing.footerContact')}</a>
                        </div>
                        <div className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} {t('landing.footerCopyright')}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
