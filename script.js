document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 2. Sticky Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. Typing Text Animation (Hero Section)
    // ==========================================
    const words = [
        'مروج هوش مصنوعی در بازاریابی',
        'متخصص هوش مصنوعی مولد',
        'استراتژیست محتوا',
        'علاقه‌مند به بازاریابی محتوایی'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Regular typing speed
        }

        // If word is completely typed
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } 
        // If word is completely deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (dynamicText) {
        typeEffect();
    }

    // ==========================================
    // 4. Tab Switching (Experience & Teaching)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and target content
            btn.classList.add('active');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) {
                targetEl.classList.add('active');
            }
        });
    });

    // ==========================================
    // 5. Active Link Highlight on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ==========================================
    // 6. Copy to Clipboard Utility
    // ==========================================
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            const originalHTML = btn.innerHTML;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                btn.innerHTML = '<i class="fa-solid fa-check" style="color: #0bde51;"></i>';
                btn.setAttribute('title', 'کپی شد!');
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.setAttribute('title', 'کپی کردن');
                }, 2000);
            }).catch(err => {
                console.error('کپی انجام نشد: ', err);
            });
        });
    });

    // ==========================================
    // 7. Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loader
            const btnText = formSubmitBtn.querySelector('.btn-text');
            const btnLoader = formSubmitBtn.querySelector('.btn-loader');
            
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            formSubmitBtn.setAttribute('disabled', 'true');
            formStatus.className = 'form-status hidden';

            // Gather data
            const formData = {
                name: document.getElementById('formName').value,
                email: document.getElementById('formEmail').value,
                phone: document.getElementById('formPhone').value,
                subject: document.getElementById('formSubject').value,
                message: document.getElementById('formMessage').value
            };

            // Simulate form submission API call
            setTimeout(() => {
                // Reset loader
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
                formSubmitBtn.removeAttribute('disabled');
                
                // Show success status
                formStatus.textContent = `${formData.name} عزیز، پیام شما با موفقیت ثبت شد. به زودی با شما تماس خواهم گرفت.`;
                formStatus.className = 'form-status success';
                
                // Reset form fields
                contactForm.reset();
            }, 1500);
        });
    }

    // ==========================================
    // 8. Scroll Fade-in Animation (IntersectionObserver)
    // ==========================================
    // Add fade-in classes dynamically to sections
    sections.forEach((section, index) => {
        // Hero is already visible, start from section index 1
        if (index > 0) {
            section.classList.add('fade-in-section');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve once shown
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ==========================================
    // 9. Blog & Social Media Feed Filtering & Rendering
    // ==========================================
    const feedData = [
        // --- VIRGOOL ARTICLES (11 items, Bahman 1404 to Tir 1405) ---
        {
            title: "پرامپت‌های طلایی برای استراتژی محتوا در سال جدید",
            date: "تیر ۱۴۰۵",
            type: "virgool",
            tag: "هوش مصنوعی",
            desc: "راهنمایی عملی برای عبور از پاسخ‌های کلیشه‌ای هوش مصنوعی مولد در بازاریابی و طراحی روایت‌های خلاقانه‌تر.",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo"
        },
        {
            title: "سمفونی سکوت و صدا | تأملی بر فیلم C’mon C’mon",
            date: "تیر ۱۴۰۵",
            type: "virgool",
            tag: "تحلیل فیلم",
            desc: "فیلم C’mon C’mon نه فقط یک فیلم، بلکه تجربه‌ای زیسته از جنس ارتباط، سکوت، صدا و تلاش برای فهمیدن دنیاست.",
            svgType: "film",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo/cmon-cmon-movie-uwetlar2qde2"
        },
        {
            title: "آیا هوش مصنوعی می‌تواند جایگزین درک شهودی انسان شود؟",
            date: "خرداد ۱۴۰۵",
            type: "virgool",
            tag: "هوش مصنوعی مولد",
            desc: "بررسی کم‌وکاستی‌های هوش مصنوعی مولد در تولید محتوا و چگونگی پر کردن این شکاف با خلاقیت و درک عاطفی انسان.",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1675557009875-436f09780264?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo/is-it-written-with-ai-fgdn7gkdpfjh"
        },
        {
            title: "چرا ایمیل‌های مارکتینگ ما باز نمی‌شوند؟ (خاکستری شدن ایمیل)",
            date: "خرداد ۱۴۰۵",
            type: "virgool",
            tag: "بازاریابی دیجیتال",
            desc: "ارسال ایمیل‌های انبوه همیشه آن‌طور که تصور می‌کنید خوب نیست و ممکن است پس از مدتی ایمیل‌هایتان وارد پوشه اسپم یا نادیده گرفته شوند.",
            svgType: "marketing",
            image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo/graymail-r1nirswzkzpq"
        },
        {
            title: "۵ کتاب روانشناسی که نگاه شما را به مخاطب تغییر می‌دهد",
            date: "اردیبهشت ۱۴۰۵",
            type: "virgool",
            tag: "روانشناسی مخاطب",
            desc: "معرفی کتاب‌هایی در حوزه روانشناسی و رفتار مصرف‌کننده که به استراتژیست‌های محتوا در شناخت عمیق پرسونای مخاطب کمک می‌کند.",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo"
        },
        {
            title: "چطور فیل کمال‌گرایی تولید محتوا را به فنجون تبدیل کنیم؟",
            date: "اردیبهشت ۱۴۰۵",
            type: "virgool",
            tag: "تولید محتوا",
            desc: "تکنیک‌ها و متدهای کاربردی برای سرعت بخشیدن به فرآیند ایده‌پردازی و غلبه بر کمال‌گرایی با کمک ابزارهای مولد هوش مصنوعی.",
            svgType: "creative",
            image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo"
        },
        {
            title: "دکمه مکث کجاست؟ | راهنمای غلبه بر وراجی‌های ذهنی",
            date: "فروردین ۱۴۰۵",
            type: "virgool",
            tag: "توسعه فردی",
            desc: "«وراجی» کتابی است که نه‌تنها به ما کمک می‌کند تا این پدیده را درک کنیم، بلکه ابزارهای عملی‌‌‌ای برای مدیریت آن ارائه می‌کند.",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo/mental-voices-ks8vaqadkmnd"
        },
        {
            title: "بازاریابی محتوایی بدون بودجه‌های میلیاردی؛ چطور ممکن است؟",
            date: "فروردین ۱۴۰۵",
            type: "virgool",
            tag: "استراتژی محتوا",
            desc: "چگونه با تمرکز روی سئو، توزیع هوشمندانه محتوا و خلق روایت‌های جذاب، بدون نیاز به بودجه‌های کلان برند خود را رشد دهیم.",
            svgType: "marketing",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo"
        },
        {
            title: "سئو معنایی (Semantic SEO)؛ پادشاهی مفاهیم به جای کلمات کلیدی",
            date: "اسفند ۱۴۰۴",
            type: "virgool",
            tag: "بهینه‌سازی سئو",
            desc: "چرا موتورهای جستجو به دنبال درک معنای پشت کلمات هستند و چگونه ساختار محتوایی سایت را برای سئوی مفهومی بهینه کنیم.",
            svgType: "data",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo"
        },
        {
            title: "رمان «نازنین» اثر داستایوفسکی؛ سفری به اعماق لایه‌های روان",
            date: "اسفند ۱۴۰۴",
            type: "virgool",
            tag: "معرفی کتاب",
            desc: "تحلیلی بر رمان کوتاه نازنین اثر فیودور داستایوفسکی و کاوشی در لایه‌های پنهان روابط انسانی و تنهایی ذهن.",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo/nazanin-novel-rhr7ip9g8rry"
        },
        {
            title: "د.و.س.ت.ی که از جهنم برگشت | درس‌های زندگی متیو پری",
            date: "بهمن ۱۴۰۴",
            type: "virgool",
            tag: "توسعه فردی",
            desc: "متیو پری آن آدم خوشبختی که تصور می‌کنیم نبود؛ درس‌هایی از زندگی‌نامهٔ صریح متیو درباره مبارزه با اعتیاد و جستجوی معنا.",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=60",
            link: "https://virgool.io/@Nima.HaghighatJoo/a-friend-who-came-back-from-hell-of4odfoy8mvq"
        },

        // --- LINKEDIN POSTS (11 items, Bahman 1404 to Tir 1405) ---
        {
            title: "تلفیق داده و روایت؛ مرز باریک میان علم و هنر در مارکتینگ",
            date: "تیر ۱۴۰۵",
            type: "linkedin",
            tag: "استراتژی محتوا",
            desc: "داده‌ها جهت حرکت را مشخص می‌کنند، اما این داستان است که مخاطب را مجاب به همراهی می‌کند. چطور این دو را در کمپین‌ها تلفیق کنیم؟",
            svgType: "data",
            image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "چگونگی تحول روند کار آژانس راتین با ابزارهای هوش مصنوعی مولد",
            date: "تیر ۱۴۰۵",
            type: "linkedin",
            tag: "هوش مصنوعی",
            desc: "هوش مصنوعی مولد ابزاری کارآمد در دستان استراتژیست خلاق است. گزارش کارورزی و پیاده‌سازی ابزارهای هوش مصنوعی در آژانس دیجیتال راتین.",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "چالش‌های مدیریت تیم تولید محتوا در پروژه‌های دیجیتال مارکتینگ",
            date: "خرداد ۱۴۰۵",
            type: "linkedin",
            tag: "مدیریت تیم",
            desc: "مدیریت خلاقیت در تیم‌های بازاریابی نیاز به توازن میان انضباط تقویم محتوایی و آزادی ذهن طراحان دارد. تجربه‌های من در صباویژن.",
            svgType: "creative",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "متریک‌های کلیدی ارزیابی عملکرد پادکست‌های برند (نمونه صباکست)",
            date: "خرداد ۱۴۰۵",
            type: "linkedin",
            tag: "بازاریابی پادکست",
            desc: "پادکست برندی فراتر از تولید فایل صوتی است. چگونه ایمپرشن، شنونده وفادار و نرخ تبدیل صباکست را اندازه‌گیری و بهبود دادیم؟",
            svgType: "film",
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "چرا مهندسی پرامپت یک مهارت حیاتی برای مدیران مارکتینگ است؟",
            date: "اردیبهشت ۱۴۰۵",
            type: "linkedin",
            tag: "هوش مصنوعی مولد",
            desc: "توانایی گفتگو با مدل‌های زبانی بزرگ (LLMها)، سرعت و عمق تحقیقات بازار و ایده پردازی استراتژیک شما را چندبرابر خواهد کرد.",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1675557009875-436f09780264?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "گزارشی از کارگاه هوش مصنوعی در بازاریابی مجتمع فنی تهران",
            date: "اردیبهشت ۱۴۰۵",
            type: "linkedin",
            tag: "گزارش رویداد",
            desc: "خوشحالم که در شعبه مرکزی مجتمع فنی میزبان علاقه‌مندان به استفاده کاربردی از هوش مصنوعی در بازاریابی محتوایی بودم.",
            svgType: "creative",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "تفاوت کمپین‌های مناسبتی موفق با کمپین‌های پر سروصدا اما بی‌نتیجه",
            date: "فروردین ۱۴۰۵",
            type: "linkedin",
            tag: "کپی‌رایتینگ",
            desc: "یک شعار تبلیغاتی خوب در کمپین‌های یلدا یا نوروز چطور شکل می‌گیرد؟ کپی‌رایتینگ متقاعدکننده بر پایه شناخت عمیق نیاز مخاطب.",
            svgType: "marketing",
            image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "نقش تفکر خلاق در شکستن بن‌بست‌های ذهنی بازاریابان محتوا",
            date: "فروردین ۱۴۰۵",
            type: "linkedin",
            tag: "خلاقیت",
            desc: "وقتی کلمات یاری نمی‌کنند و ایده‌ها کلیشه‌ای می‌شوند، چه تکنیک‌هایی به ما برای باز کردن ذهن کمک می‌کنند؟",
            svgType: "creative",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "آینده موتورهای جستجو با ورود چت‌بات‌ها؛ سئو به کدام سو می‌رود؟",
            date: "اسفند ۱۴۰۴",
            type: "linkedin",
            tag: "بهینه‌سازی سئو",
            desc: "جستجوی سنتی گوگل در حال حرکت به سمت موتورهای پاسخ‌دهی هوشمند است. استراتژیست‌های محتوا چطور باید برای این آینده آماده شوند؟",
            svgType: "data",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "چرا ارتباطات برند باید ساده، شفاف و دور از پیچیدگی‌های بیهوده باشد؟",
            date: "اسفند ۱۴۰۴",
            type: "linkedin",
            tag: "ارتباطات برند",
            desc: "برندهایی در ذهن می‌مانند که بتوانند پیام خود را در کوتاه‌ترین زمان و به شفاف‌ترین شکل ممکن به مخاطب هدف برسانند.",
            svgType: "marketing",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },
        {
            title: "چگونه با بهبود ساختار محتوایی بلاگ، ایمپرشن صباویژن را ارتقا دادیم",
            date: "بهمن ۱۴۰۴",
            type: "linkedin",
            tag: "بازاریابی محتوا",
            desc: "گزارش گام به گام تحلیل شکاف محتوایی، سئو معنایی صفحات بلاگ و مدیریت اثربخش تیم تولید محتوا در صباویژن.",
            svgType: "data",
            image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=500&auto=format&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nima-haghighatjoo"
        },

        // --- INSTAGRAM POSTS (11 items, Bahman 1404 to Tir 1405) ---
        {
            title: "ریلز: ۳ پرامپت طلایی برای بازنویسی خلاق متون با هوش مصنوعی",
            date: "تیر ۱۴۰۵",
            type: "instagram",
            tag: "پرامپت‌نویسی",
            desc: "چطور متون طولانی را با پرامپت‌های مهندسی‌شده به پست‌های اینستاگرام یا سناریوهای ویدیویی پرانرژی تبدیل کنیم؟",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "پست: معرفی متدولوژی فنجون برای مدیریت کارهای تولید محتوا",
            date: "تیر ۱۴۰۵",
            type: "instagram",
            tag: "توسعه فردی",
            desc: "تولید ۴ فرمت اصلی محتوایی با تقسیم پروژه‌ها به بخش‌های کوچک و استفاده بهینه از زمان و ابزارهای هوش مصنوعی.",
            svgType: "creative",
            image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "ریلز: تحلیل استراتژی محتوای رقیب با کمک ابزار هوش مصنوعی Claude",
            date: "خرداد ۱۴۰۵",
            type: "instagram",
            tag: "هوش مصنوعی",
            desc: "کافیست داده‌ها را وارد کلود کنید تا نقاط قوت، شکاف‌های محتوایی و فرصت‌های کمپین‌های رقبا را برایتان استخراج کند.",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "پست: چک‌لیست طلایی نوشتن کپشن‌های متقاعدکننده در اینستاگرام",
            date: "خرداد ۱۴۰۵",
            type: "instagram",
            tag: "کپی‌رایتینگ",
            desc: "فرمولی ساده و ۴ مرحله‌ای برای جلب توجه مخاطب در نخستین ثانیه‌ها و هدایت او به سمت اقدام نهایی (Call to Action).",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "ریلز: پشت صحنه تدریس هوش مصنوعی مولد در مجتمع فنی تهران",
            date: "اردیبهشت ۱۴۰۵",
            type: "instagram",
            tag: "تدریس هوش مصنوعی",
            desc: "بخشی از مباحث داغ کلاس پیرامون نحوه بکارگیری هوش مصنوعی در ایده‌پردازی سناریوهای خلاقانه برای ریلز.",
            svgType: "creative",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "پست: تفاوت کپی‌رایتینگ خلاق انسانی با متن‌های سرد هوش مصنوعی",
            date: "اردیبهشت ۱۴۰۵",
            type: "instagram",
            tag: "کپی‌رایتینگ",
            desc: "چطور حس همدلی، طنز و لحن منحصر‌به‌فرد برند را به متن‌ها اضافه کنیم تا بوی هوش مصنوعی ندهند.",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "ریلز: چرا پادکست بروکست را شروع کردم؟ ناگفته‌های صوتی من",
            date: "فروردین ۱۴۰۵",
            type: "instagram",
            tag: "پادکست بروکست",
            desc: "گفتگویی صمیمی درباره اهمیت صوت، روایتگری داستان‌های توسعه فردی و فلسفه خلق پادکست بروکست.",
            svgType: "film",
            image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "پست: اینفوگرافیک مراحل ایده‌پردازی تا اجرای یک کمپین مناسبتی موفق",
            date: "فروردین ۱۴۰۵",
            type: "instagram",
            tag: "ایده‌پردازی",
            desc: "از طوفان فکری اولیه تا تعیین تقویم محتوایی و نوشتن کپی‌های نهایی برای شبکه‌های اجتماعی.",
            svgType: "marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "ریلز: چطور از وراجی‌های ذهنی خلاص شویم؟ تحلیل عملی کتاب وراجی",
            date: "اسفند ۱۴۰۴",
            type: "instagram",
            tag: "توسعه فردی",
            desc: "در این ریلز به سراغ راهکارهای عملی کتاب رفته‌ام تا ذهنمان را برای تمرکز روی پروژه‌های کاری مرتب کنیم.",
            svgType: "writing",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "پست: ۵ اشتباه مهلک در بکارگیری هوش مصنوعی برای وبلاگ‌نویسی",
            date: "اسفند ۱۴۰۴",
            type: "instagram",
            tag: "تولید محتوا",
            desc: "استفاده نابجا از هوش مصنوعی چه لطمه‌ای به سئوی سایت و اعتبار برند شما خواهد زد و چطور باید آن را اصلاح کرد.",
            svgType: "ai",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        },
        {
            title: "ریلز: چرا بازاریابی محتوایی نیاز به داستان‌سرایی دارد نه تبلیغات مستقیم؟",
            date: "بهمن ۱۴۰۴",
            type: "instagram",
            tag: "داستان‌سرایی",
            desc: "مخاطب امروز تبلیغات مستقیم را فیلتر می‌کند. چطور با ایجاد قصه همزادپندارانه، برند خود را در ذهن او ماندگار کنیم.",
            svgType: "marketing",
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=60",
            link: "https://instagram.com/nima_hgjoo"
        }
    ];

    let currentFilter = 'all';
    let visibleCount = 6;
    const feedGrid = document.getElementById('feedGrid');
    const feedLoadMoreBtn = document.getElementById('feedLoadMoreBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Vector SVG Featured Image Generator for premium tech-aesthetics
    function getFeaturedSVG(svgType, colorTheme) {
        let pathContent = '';
        if (svgType === 'ai') {
            pathContent = `
                <circle cx="100" cy="80" r="10" fill="url(#feedGrad)" />
                <circle cx="60" cy="50" r="6" fill="#fff" opacity="0.8" />
                <circle cx="140" cy="50" r="6" fill="#fff" opacity="0.8" />
                <circle cx="60" cy="110" r="6" fill="#fff" opacity="0.8" />
                <circle cx="140" cy="110" r="6" fill="#fff" opacity="0.8" />
                <line x1="100" y1="80" x2="60" y2="50" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="100" y1="80" x2="140" y2="50" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="100" y1="80" x2="60" y2="110" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="100" y1="80" x2="140" y2="110" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="60" y1="50" x2="140" y2="50" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4 4" />
                <line x1="60" y1="110" x2="140" y2="110" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4 4" />
            `;
        } else if (svgType === 'data') {
            pathContent = `
                <rect x="50" y="90" width="14" height="40" rx="3" fill="url(#feedGrad)" />
                <rect x="75" y="60" width="14" height="70" rx="3" fill="url(#feedGrad)" />
                <rect x="100" y="40" width="14" height="90" rx="3" fill="url(#feedGrad)" />
                <rect x="125" y="75" width="14" height="55" rx="3" fill="url(#feedGrad)" />
                <rect x="150" y="50" width="14" height="80" rx="3" fill="url(#feedGrad)" />
                <path d="M 57 85 L 82 55 L 107 35 L 132 70 L 157 45" fill="none" stroke="#fff" stroke-width="2" />
                <circle cx="107" cy="35" r="5" fill="#fff" />
            `;
        } else if (svgType === 'creative') {
            pathContent = `
                <circle cx="100" cy="75" r="25" fill="none" stroke="url(#feedGrad)" stroke-width="3" />
                <path d="M 90 100 L 110 100 M 93 105 L 107 105 M 96 110 L 104 110" stroke="#fff" stroke-width="2" />
                <line x1="100" y1="40" x2="100" y2="25" stroke="url(#feedGrad)" stroke-width="2.5" />
                <line x1="65" y1="50" x2="55" y2="40" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="135" y1="50" x2="145" y2="40" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="65" y1="75" x2="50" y2="75" stroke="url(#feedGrad)" stroke-width="2" />
                <line x1="135" y1="75" x2="150" y2="75" stroke="url(#feedGrad)" stroke-width="2" />
            `;
        } else if (svgType === 'film') {
            pathContent = `
                <rect x="40" y="50" width="120" height="60" rx="6" fill="none" stroke="url(#feedGrad)" stroke-width="3" />
                <line x1="40" y1="65" x2="160" y2="65" stroke="url(#feedGrad)" stroke-dasharray="6 6" />
                <line x1="40" y1="95" x2="160" y2="95" stroke="url(#feedGrad)" stroke-dasharray="6 6" />
                <circle cx="75" cy="80" r="10" fill="none" stroke="#fff" stroke-width="2" />
                <circle cx="125" cy="80" r="10" fill="none" stroke="#fff" stroke-width="2" />
            `;
        } else if (svgType === 'writing') {
            pathContent = `
                <line x1="50" y1="55" x2="150" y2="55" stroke="#fff" stroke-width="3" opacity="0.8" />
                <line x1="50" y1="75" x2="135" y2="75" stroke="url(#feedGrad)" stroke-width="3" />
                <line x1="50" y1="95" x2="115" y2="95" stroke="url(#feedGrad)" stroke-width="3" />
                <rect x="135" y="85" width="15" height="15" rx="3" fill="url(#feedGrad)" />
            `;
        } else {
            pathContent = `
                <path d="M 55 70 L 95 45 L 130 45 L 135 95 L 95 95 Z" fill="none" stroke="url(#feedGrad)" stroke-width="3" />
                <path d="M 135 60 C 145 65 145 75 135 80" fill="none" stroke="#fff" stroke-width="2" />
                <path d="M 140 52 C 158 62 158 88 140 98" fill="none" stroke="#fff" stroke-width="1.5" />
                <rect x="75" y="85" width="12" height="25" rx="2" fill="url(#feedGrad)" transform="rotate(15 75 85)" />
            `;
        }

        let gradColors = '';
        if (colorTheme === 'virgool') {
            gradColors = `
                <linearGradient id="feedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#044CE7" />
                    <stop offset="100%" stop-color="#32578A" />
                </linearGradient>
            `;
        } else if (colorTheme === 'linkedin') {
            gradColors = `
                <linearGradient id="feedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0B51DE" />
                    <stop offset="100%" stop-color="#044CE7" />
                </linearGradient>
            `;
        } else {
            gradColors = `
                <linearGradient id="feedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#D67007" />
                    <stop offset="100%" stop-color="#C86508" />
                </linearGradient>
            `;
        }

        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
                <defs>
                    ${gradColors}
                    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#07121F" />
                        <stop offset="100%" stop-color="#02070C" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#bgGrad)" />
                <g opacity="0.8">
                    ${pathContent}
                </g>
            </svg>
        `;
    }

    function renderFeeds() {
        if (!feedGrid) return;
        
        feedGrid.innerHTML = '';
        
        // Filter items
        const filteredItems = feedData.filter(item => {
            return currentFilter === 'all' || item.type === currentFilter;
        });

        // Slice for pagination
        const itemsToRender = filteredItems.slice(0, visibleCount);

        itemsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feed-card';
            card.setAttribute('data-type', item.type);

            const isVirgool = item.type === 'virgool';
            const isLinkedin = item.type === 'linkedin';
            
            let iconClass = 'fa-solid fa-pen-fancy';
            if (isLinkedin) iconClass = 'fa-brands fa-linkedin';
            if (item.type === 'instagram') iconClass = 'fa-brands fa-instagram';

            let sourceText = 'ویرگول';
            if (isLinkedin) sourceText = 'لینکدین';
            if (item.type === 'instagram') sourceText = 'اینستاگرام';

            let linkText = 'مطالعه مقاله';
            if (isLinkedin) linkText = 'مشاهده در لینکدین';
            if (item.type === 'instagram') linkText = 'مشاهده در اینستاگرام';

            card.innerHTML = `
                <div class="feed-card-image">
                    <!-- Loaded dynamically via JS to handle onerror in local lexical scope -->
                </div>
                <div class="feed-card-header" style="margin-top: 20px;">
                    <span class="feed-tag tag-${item.type}"><i class="${iconClass}"></i> ${item.tag}</span>
                    <span class="feed-source">${sourceText} • ${item.date}</span>
                </div>
                <h4 class="feed-card-title">${item.title}</h4>
                <p class="feed-card-desc">${item.desc}</p>
                <a href="${item.link}" target="_blank" class="feed-card-link">${linkText} <i class="fa-solid fa-chevron-left"></i></a>
            `;

            // Setup image elements dynamically to keep local scope for error event listener
            const imageContainer = card.querySelector('.feed-card-image');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            img.className = 'feed-card-img-source';
            img.addEventListener('error', () => {
                imageContainer.innerHTML = getFeaturedSVG(item.svgType, item.type);
            });
            imageContainer.appendChild(img);

            feedGrid.appendChild(card);
        });

        // Show/Hide load more button
        if (filteredItems.length > visibleCount) {
            feedLoadMoreBtn.classList.remove('hidden');
        } else {
            feedLoadMoreBtn.classList.add('hidden');
        }
    }

    // Initialize feeds rendering
    if (feedGrid) {
        renderFeeds();

        // Load More button click
        feedLoadMoreBtn.addEventListener('click', () => {
            visibleCount += 6; // Load 6 more items
            renderFeeds();
        });

        // Filters buttons click
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentFilter = filterValue;
                visibleCount = 6; // Reset visible count on filter switch
                renderFeeds();
            });
        });
    }

});


