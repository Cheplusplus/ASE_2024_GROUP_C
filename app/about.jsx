const AboutUs = () => {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
                    <p className="text-lg text-gray-600">
                        We’re the passionate developers behind Recipe Rush, dedicated to making culinary exploration easy, fun, and accessible for everyone. Our team brings together diverse skills and a shared love for cooking to build a platform that inspires people to try new recipes, master classics, and find joy in the kitchen.
                    </p>
                </div>
                <div className="flex flex-wrap mt-12 justify-center gap-y-14 max-w-3xl mx-auto lg:max-w-full">
                    {[
                        { name: "Nomusa Mtshali", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/nomusamtshali",  linkin: "https://www.linkedin.com/in/nomusa-mtshali/" },
                        { name: "Phillip Bogopane", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/Phillip-tech",  linkin: "https://linkedin.com/in/username" },
                        { name: "Kutlwano Ramotebele", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/kutlwano10",  linkin: "https://www.linkedin.com/in/kutlwano-ramotebele-769461296/" },
                        { name: "Kealeboga A Ntheledi", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/Kea-Angel-Ntheledi",  linkin: "https://linkedin.com/in/username" },
                        { name: "Koketso Moilwe", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/KoketsoMoilwe20",  linkin: "https://www.linkedin.com/in/koketsomoilwe/" },
                        { name: "Karabo M. Radebe", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/Karabo-M-Radebe", linkin: "https://www.linkedin.com/in/karabo-m-radebe/" },
                        { name: "Kitso Mogale", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/KitsoMogale",  linkin: "https://www.linkedin.com/in/kitso-mogale-200663321/" },
                        { name: "Mmakgosana Makgaka", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/Mmakgosana", linkin: "https://www.linkedin.com/in/mmakgosana-makgaka-b32478313/" },
                        { name: "Mateo Benzien", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/Mateo-Benzien",  linkin: "https://www.linkedin.com/in/mateo-benzien-857864302/" },
                        { name: "Sabelo Mawela", role: "add role", imgSrc: "https://via.placeholder.com/150", github: "https://github.com/SABELOMAWELA",  linkin: "https://www.linkedin.com/in/sabelo-mawela-480793296/" },
                    ].map((member, index) => (
                        <div key={index} className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src={member.imgSrc} alt={`${member.name} image`} className="w-28 h-28 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">{member.name}</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">{member.role}</span>
                            <div className="space-x-4 mt-4">
                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                                    {/* GitHub Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="#333" viewBox="0 0 24 24">
                                        <path d="M12 .5C5.371.5 0 5.872 0 12.5c0 5.25 3.438 9.75 8.205 11.388.6.111.793-.261.793-.577v-2.273c-3.338.724-4.043-1.607-4.043-1.607-.546-1.383-1.333-1.752-1.333-1.752-1.086-.742.083-.727.083-.727 1.204.085 1.84 1.237 1.84 1.237 1.067 1.843 2.8 1.309 3.487.999.107-.772.418-1.309.76-1.607-2.665-.3-5.465-1.334-5.465-5.935 0-1.314.47-2.387 1.236-3.224-.124-.303-.536-1.53.116-3.184 0 0 1.007-.322 3.298 1.228a11.364 11.364 0 0 1 3.005-.405c1.018.005 2.043.138 3.005.405 2.29-1.55 3.298-1.228 3.298-1.228.653 1.654.241 2.88.118 3.184.766.837 1.236 1.91 1.236 3.224 0 4.616-2.804 5.633-5.475 5.93.429.37.813 1.099.813 2.221v3.287c0 .318.191.694.797.577C20.563 22.25 24 17.75 24 12.5 24 5.872 18.629.5 12 .5z"/>
                                    </svg>
                                </a>
                                <a href={member.linkin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                                    {/* LinkedIn Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#333" viewBox="0 0 24 24">
                                        <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882 0 4.47 1.291 5.765 2.882 5.765S5.765 4.47 5.765 2.882C5.765 1.291 4.47 0 2.882 0z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;