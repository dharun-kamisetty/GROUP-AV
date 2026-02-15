import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, Globe, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 mb-8 animate-fade-in-up">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                            Arovia Health Logic v1.0 Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 animate-fade-in-up delay-100">
                            Intelligent Triage for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                                Every Citizen
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                            Revolutionizing first-point healthcare access in India.
                            AI-powered assessments, multilingual voice support, and instant facility matching.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
                            <button
                                onClick={() => navigate('/app')}
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-lg font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
                    <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-teal-200 opacity-20 blur-3xl"></div>
                </div>
            </section>

            {/* Stats / The Problem */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="p-4">
                            <div className="text-4xl font-bold text-gray-900 mb-2">1:1,445</div>
                            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Doctor-to-Patient Ratio</div>
                            <p className="mt-2 text-gray-600">Well below the WHO recommendation of 1:1,000, leading to severe access gaps.</p>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-gray-900 mb-2">2-4 hrs</div>
                            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Average Wait Time</div>
                            <p className="mt-2 text-gray-600">For basic consultations in public facilities, delaying critical care.</p>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-gray-900 mb-2">10 min</div>
                            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Door-to-Triage</div>
                            <p className="mt-2 text-gray-600">Manual processes slow down identification of emergency cases.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Healthcare Intelligence at Scale
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Arovia combines clinical protocols with advanced AI to bridge the gap between patients and care.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Activity className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Symptom Triage</h3>
                            <p className="text-gray-600">
                                Advanced NLP analyzes symptoms to assess urgency (1-10 scale) and identify potential conditions instantly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Red Flag Detection</h3>
                            <p className="text-gray-600">
                                Real-time identification of life-threatening emergencies (Cardiac, Stroke, Trauma) for immediate escalation.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Multilingual Voice</h3>
                            <p className="text-gray-600">
                                Speak naturally in Hindi, English, or regional languages. Powered by Whisper for high-accuracy transcription.
                            </p>
                        </div>
                        {/* Feature 4 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-2 mb-4">
                                <span className="text-4xl">📍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Matching</h3>
                            <p className="text-gray-600">
                                Geolocation-based search connects patients to the nearest appropriate facilities (Govt, NGO, Private).
                            </p>
                        </div>
                        {/* Feature 5 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-2 mb-4">
                                <span className="text-4xl">📄</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Referral Notes</h3>
                            <p className="text-gray-600">
                                Generates structured medical summaries for seamless handoffs to doctors, reducing administrative burden.
                            </p>
                        </div>
                        {/* Feature 6 */}
                        <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-8 shadow-lg text-white flex flex-col justify-center items-center text-center">
                            <h3 className="text-2xl font-bold mb-4">Ready to try?</h3>
                            <p className="mb-6 opacity-90">Experience the future of triage today.</p>
                            <button
                                onClick={() => navigate('/app')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Launch Dashboard <ChevronRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center space-x-2 text-2xl font-bold">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-lg">A</span>
                                </div>
                                <span>Arovia</span>
                            </div>
                            <p className="text-gray-400 mt-2 text-sm">AI-Powered Health Triage Agent</p>
                        </div>
                        <div className="flex space-x-8 text-gray-400">
                            <span className="hover:text-white cursor-pointer">Privacy</span>
                            <span className="hover:text-white cursor-pointer">Terms</span>
                            <span className="hover:text-white cursor-pointer">Contact</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Arovia Health. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
