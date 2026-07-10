document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initBannerCarousel();
    initScrollAnimations();
    initProductFullpage();
    initNewsSearch();
    initJobExpand();
    initModal();
    initMobileMenu();
});

// 导航栏滚动渐变效果
function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    // 判断是否在首页
    const isHome = document.body.classList.contains('home') || window.location.pathname === '/' || window.location.pathname === '/genuineknowledge.github.io/';

    const updateHeader = () => {
        if (!isHome || window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader);
}

// Banner 轮播（自动5秒、悬停暂停、箭头/圆点切换、淡入淡出）
function initBannerCarousel() {
    const carousel = document.getElementById('bannerCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.banner-slide');
    const prevBtn = document.getElementById('bannerPrev');
    const nextBtn = document.getElementById('bannerNext');
    const indicators = document.getElementById('bannerIndicators').querySelectorAll('.indicator-dot');
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    const interval = 5000;

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        currentIndex = (index + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, interval);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
    });

    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoPlay();
        });
    });

    // 鼠标悬停暂停，移开恢复
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
}

// 滚动渐入动画（企业文化、时间轴等）
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-animate, .timeline-item');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// 产品页全屏滚动 + 圆点导航 + 进度条 + 键盘切换
function initProductFullpage() {
    const fullpage = document.getElementById('productsFullpage');
    const dots = document.querySelectorAll('#scrollIndicator .indicator-dot');
    const progressBar = document.getElementById('progressBar');
    if (!fullpage || !dots.length) return;

    const sections = fullpage.querySelectorAll('.product-section');
    const total = sections.length;

    function updateScrollState() {
        const scrollTop = fullpage.scrollTop;
        const viewHeight = fullpage.clientHeight;
        const currentIndex = Math.round(scrollTop / viewHeight);

        // 更新右侧圆点
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // 更新顶部进度条
        const maxScroll = fullpage.scrollHeight - viewHeight;
        const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    fullpage.addEventListener('scroll', updateScrollState);
    updateScrollState();

    // 圆点点击跳转
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const viewHeight = fullpage.clientHeight;
            fullpage.scrollTo({
                top: index * viewHeight,
                behavior: 'smooth'
            });
        });
    });

    // 键盘上下键切换
    document.addEventListener('keydown', (e) => {
        const viewHeight = fullpage.clientHeight;
        const current = Math.round(fullpage.scrollTop / viewHeight);

        if (e.key === 'ArrowDown' && current < total - 1) {
            e.preventDefault();
            fullpage.scrollTo({
                top: (current + 1) * viewHeight,
                behavior: 'smooth'
            });
        }
        if (e.key === 'ArrowUp' && current > 0) {
            e.preventDefault();
            fullpage.scrollTo({
                top: (current - 1) * viewHeight,
                behavior: 'smooth'
            });
        }
    });
}

// 新闻页实时搜索过滤
function initNewsSearch() {
    const searchInput = document.getElementById('newsSearch');
    const newsList = document.getElementById('newsList');
    if (!searchInput || !newsList) return;

    const cards = newsList.querySelectorAll('.news-card');

    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector('.news-title').textContent.toLowerCase();
            const summary = card.querySelector('.news-summary').textContent.toLowerCase();

            if (title.includes(keyword) || summary.includes(keyword)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 招聘卡片展开/收起
function initJobExpand() {
    const jobCards = document.querySelectorAll('.job-card');
    if (!jobCards.length) return;

    jobCards.forEach(card => {
        const header = card.querySelector('.job-header');
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
}

// 通用弹窗（产品详情 + 简历投递）
function initModal() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const content = document.getElementById('modalContent');
    if (!overlay) return;

    function openModal(html) {
        content.innerHTML = html;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            closeModal();
        }
    });

    // 产品「了解更多」弹窗
    document.querySelectorAll('.product-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.dataset.product;
            openModal(`
                <h3>${productName}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px; line-height: 1.8;">
                    该产品完整方案将在后续正式上线。如需了解功能细节、部署方式与商务报价，欢迎预约演示，我们的顾问将为您一对一讲解。
                </p>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-primary" onclick="alert('已提交预约请求'); document.getElementById('modalClose').click();">预约演示</button>
                    <button class="btn btn-outline" onclick="document.getElementById('modalClose').click();">关闭</button>
                </div>
            `);
        });
    });

    // 「投递简历」弹窗
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const jobName = btn.dataset.job;
            openModal(`
                <h3>投递简历 - ${jobName}</h3>
                <form onsubmit="event.preventDefault(); alert('简历已提交，我们会尽快与您联系！'); document.getElementById('modalClose').click();">
                    <div class="form-group">
                        <label>姓名</label>
                        <input type="text" required placeholder="请输入您的姓名">
                    </div>
                    <div class="form-group">
                        <label>联系邮箱</label>
                        <input type="email" required placeholder="请输入您的邮箱">
                    </div>
                    <div class="form-group">
                        <label>个人简介</label>
                        <textarea rows="3" placeholder="简单介绍一下自己"></textarea>
                    </div>
                    <div class="form-group">
                        <label>上传简历</label>
                        <div class="file-upload" onclick="this.nextElementSibling.click()">
                            点击上传 PDF / Word 简历
                        </div>
                        <input type="file" accept=".pdf,.doc,.docx" style="display:none;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%;">提交申请</button>
                </form>
            `);
        });
    });

    // 暴露关闭方法供弹窗内联调用
    window.closeModal = closeModal;
}

// 移动端汉堡菜单
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    // 点击链接自动关闭
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });
}