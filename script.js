// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة لوحة إمكانية الوصول
  initAccessibilityPanel();
  
  // تهيئة القائمة المتنقلة
  initMobileMenu();
  
  // تهيئة العدادات المتحركة
  initCounters();
  
  // تحميل التفضيلات المحفوظة
  loadPreferences();
});

// وظائف لوحة إمكانية الوصول
function initAccessibilityPanel() {
  const toggleBtn = document.getElementById('accessibility-toggle');
  const panel = document.getElementById('accessibility-panel');
  
  toggleBtn.addEventListener('click', function() {
    panel.classList.toggle('open');
  });
  
  // تغيير حجم الخط
  document.getElementById('font-decrease').addEventListener('click', function() {
    changeFontSize('small');
  });
  
  document.getElementById('font-default').addEventListener('click', function() {
    changeFontSize('default');
  });
  
  document.getElementById('font-increase').addEventListener('click', function() {
    changeFontSize('large');
  });
  
  // تغيير التباين
  const contrastBtns = document.querySelectorAll('.contrast-btn');
  contrastBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      changeContrast(theme);
      
      // تحديث الحالة النشطة للأزرار
      contrastBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // تغيير التباعد
  const spacingBtns = document.querySelectorAll('.spacing-btn');
  spacingBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const spacing = this.getAttribute('data-spacing');
      changeSpacing(spacing);
      
      // تحديث الحالة النشطة للأزرار
      spacingBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function changeFontSize(size) {
  document.body.classList.remove('large-font', 'larger-font');
  
  switch(size) {
    case 'small':
      // الحجم الافتراضي
      break;
    case 'large':
      document.body.classList.add('large-font');
      break;
    case 'larger':
      document.body.classList.add('larger-font');
      break;
  }
  
  // حفظ التفضيل
  savePreference('fontSize', size);
}

function changeContrast(theme) {
  document.body.classList.remove('high-contrast', 'dark');
  
  if (theme !== 'default') {
    document.body.classList.add(theme);
  }
  
  // حفظ التفضيل
  savePreference('theme', theme);
}

function changeSpacing(spacing) {
  document.body.classList.remove('wide-spacing');
  
  if (spacing === 'wide') {
    document.body.classList.add('wide-spacing');
  }
  
  // حفظ التفضيل
  savePreference('spacing', spacing);
}

// وظائف القائمة المتنقلة
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    
    // تحريك الأشرطة في زر القائمة
    const spans = menuToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // إغلاق القائمة عند النقر على رابط
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// وظائف العدادات المتحركة
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(() => updateCounter(counter, target, increment), 1);
        } else {
          counter.innerText = target;
        }
      }
    });
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function updateCounter(counter, target, increment) {
  const count = +counter.innerText;
  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => updateCounter(counter, target, increment), 1);
  } else {
    counter.innerText = target;
  }
}

// حفظ وتحميل التفضيلات
function savePreference(key, value) {
  localStorage.setItem(`aiSpaceTech_${key}`, value);
}

function loadPreferences() {
  // تحميل حجم الخط
  const fontSize = localStorage.getItem('aiSpaceTech_fontSize');
  if (fontSize) {
    changeFontSize(fontSize);
    
    // تحديث الحالة النشطة للأزرار
    const fontBtns = document.querySelectorAll('.font-btn');
    fontBtns.forEach(btn => btn.classList.remove('active'));
    
    switch(fontSize) {
      case 'small':
        document.getElementById('font-decrease').classList.add('active');
        break;
      case 'large':
        document.getElementById('font-increase').classList.add('active');
        break;
      default:
        document.getElementById('font-default').classList.add('active');
    }
  }
  
  // تحميل الثيم
  const theme = localStorage.getItem('aiSpaceTech_theme');
  if (theme) {
    changeContrast(theme);
    
    // تحديث الحالة النشطة للأزرار
    const contrastBtns = document.querySelectorAll('.contrast-btn');
    contrastBtns.forEach(btn => {
      if (btn.getAttribute('data-theme') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  // تحميل التباعد
  const spacing = localStorage.getItem('aiSpaceTech_spacing');
  if (spacing) {
    changeSpacing(spacing);
    
    // تحديث الحالة النشطة للأزرار
    const spacingBtns = document.querySelectorAll('.spacing-btn');
    spacingBtns.forEach(btn => {
      if (btn.getAttribute('data-spacing') === spacing) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

// تأثيرات إضافية
// إضافة تأثير التمرير السلس للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// تأثير الظهور عند التمرير
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .blog-card').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// إضافة فئة للرسوم المتحركة في CSS
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
// وظائف النافذة المنبثقة للمقالات
function initArticleModals() {
    const modal = document.getElementById('article-modal');
    const blogLinks = document.querySelectorAll('.blog-link');
    const closeButtons = document.querySelectorAll('.close-modal');
    const shareButton = document.getElementById('share-article');
     
    // بيانات المقالات
    const articles = {
        'ai-space': {
            title: 'الذكاء الاصطناعي في استكشاف الفضاء',
            date: '2025',
            category: 'الذكاء الاصطناعي',
            image: 'images/licensed-image (1).jpeg',
            content: `
                <h3>ثورة في استكشاف الكون</h3>
                <p>أصبح الذكاء الاصطناعي أداة حاسمة في استكشاف الفضاء، حيث يساعد في تحليل الكميات الهائلة من البيانات التي تجمعها التلسكوبات والمركبات الفضائية. من خلال خوارزميات التعلم الآلي، يمكن للباحثين اكتشاف أنماط وظواهر كانت ستستغرق سنوات لاكتشافها يدوياً.</p>
                
                <h3>التطبيقات الرئيسية</h3>
                <ul>
                    <li><strong>تحليل الصور الفلكية:</strong> اكتشاف المجرات والنجوم والكواكب الخارجية تلقائياً</li>
                    <li><strong>معالجة البيانات الطيفية:</strong> تحليل التركيب الكيميائي للأجرام السماوية</li>
                    <li><strong>التنبؤ بالطقس الفضائي:</strong> حماية الأقمار الصناعية والبعثات الفضائية</li>
                    <li><strong>الملاحة الذاتية:</strong> تمكين المركبات الفضائية من اتخاذ قرارات مستقلة</li>
                </ul>
                
                <h3>إنجازات ملموسة</h3>
                <p>استخدمت ناسا الذكاء الاصطناعي في بعثة كيبلر لاكتشاف آلاف الكواكب الخارجية، كما تعتمد وكالة الفضاء الأوروبية على خوارزميات التعلم العميق لتحسين دقة الصور الملتقطة من التلسكوبات.</p>
                
                <p>يتوقع الخبراء أن يصبح الذكاء الاصطناعي الشريك الأساسي للبشر في استكشاف الكون، مما يفتح آفاقاً جديدة لفهم أصول الكون وإمكانية الحياة beyond الأرض.</p>
            `
        },
        'smart-satellites': {
            title: 'الأقمار الصناعية الذكية',
            date: '2025',
            category: 'تكنولوجيا الفضاء',
            image: 'images/made-in-china.webp',
            content: `
                <h3>الجيل الجديد من الأقمار الصناعية</h3>
                <p>تشهد تكنولوجيا الأقمار الصناعية تحولاً جذرياً مع دمج تقنيات الذكاء الاصطناعي، مما يجعلها أكثر ذكاءً واستقلالية في أداء مهامها.</p>
                
                <h3>الميزات المتقدمة</h3>
                <ul>
                    <li><strong>المعالجة على المدار:</strong> تحليل البيانات في الوقت الحقيقي دون الحاجة لإرسالها للأرض</li>
                    <li><strong>الإدارة الذاتية:</strong> التحكم في الطاقة والاتصالات وتجنب الاصطدامات تلقائياً</li>
                    <li><strong>التكيف الديناميكي:</strong> تعديل المهام بناءً على الظروف المتغيرة</li>
                    <li><strong>التعلم المستمر:</strong> تحسين الأداء من خلال الخبرة المتراكمة</li>
                </ul>
                
                <h3>التأثير على الخدمات</h3>
                <p>تتيح الأقمار الصناعية الذكية تقديم خدمات أكثر دقة وموثوقية في مجالات:</p>
                <ul>
                    <li>الاتصالات العالمية عالية السرعة</li>
                    <li>الملاحة الدقيقة للطائرات والسفن</li>
                    <li>مراقبة الكوارث الطبيعية والاستجابة السريعة</li>
                    <li>الزراعة الدقيقة وإدارة الموارد</li>
                </ul>
                
                <p>مع تطور هذه التقنيات، نتوقع رؤية شبكات أقمار صناعية مستقلة بالكامل قادرة على التعاون لتحقيق أهداف معقدة.</p>
            `
        },
        'space-travel': {
            title: 'مستقبل السفر الفضائي',
            date: '2025',
            category: 'مستقبل الفضاء',
            image: 'images/satt2.jpg',
            content: `
                <h3>حقبة جديدة من الاستكشاف</h3>
                <p>يشهد عقدنا الحالي تحولاً تاريخياً في مفهوم السفر إلى الفضاء، حيث ينتقل من حكر الحكومات إلى مجال مفتوح للشركات الخاصة والأفراد.</p>
                
                <h3>الاتجاهات الرئيسية</h3>
                <ul>
                    <li><strong>الصواريخ القابلة لإعادة الاستخدام:</strong> خفض تكاليف الإطلاق بنسبة تصل إلى 90%</li>
                    <li><strong>السياحة الفضائية:</strong> رحلات منتظمة للمدنيين إلى حافة الفضاء والمحطة الفضائية</li>
                    <li><strong>المستوطنات القمرية:</strong> خطط لإنشاء قواعد دائمة على سطح القمر</li>
                    <li><strong>بعثات المريخ:</strong> التحضير لإرسال البشر إلى الكوكب الأحمر</li>
                </ul>
                
                <h3>دور التكنولوجيا المتقدمة</h3>
                <p>تعتمد هذه الطفرة في السفر الفضائي على تطورات تقنية متعددة:</p>
                <ul>
                    <li>أنظمة الدفع المتقدمة والمحركات الأيونية</li>
                    <li>مواد خفيفة الوزن ومقاومة للإشعاع</li>
                    <li>نظم دعم الحياة المغلقة</li>
                    <li>التشغيل الآلي والذكاء الاصطناعي</li>
                </ul>
                
                <h3>التحديات والحلول</h3>
                <p>رغم التقدم الكبير، لا تزال هناك تحديات كبيرة تتعلق بالصحة البشرية في الفضاء، حماية من الإشعاع، والاستدامة طويلة المدى. تعمل وكالات الفضاء والشركات الخاصة على تطوير حلول مبتكرة لهذه التحديات.</p>
                
                <p>بحلول عام 2040، من المتوقع أن يصبح السفر إلى الفضاء تجربة شائعة، مما يفتح فصلاً جديداً في تاريخ البشرية.</p>
            `
        }
    };
    
    // فتح النافذة المنبثقة
    blogLinks.forEach(link => {
        link.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article');
            const article = articles[articleId];
            
            if (article) {
                document.getElementById('modal-title').textContent = article.title;
                document.getElementById('modal-date').textContent = article.date;
                document.getElementById('modal-category').textContent = article.category;
                document.getElementById('modal-image').src = article.image;
                document.getElementById('modal-image').alt = article.title;
                document.getElementById('modal-content').innerHTML = article.content;
                
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // إغلاق النافذة المنبثقة
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // إغلاق بالنقر خارج المحتوى
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // إغلاق بالضغط على زر Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // مشاركة المقال
    shareButton.addEventListener('click', function() {
        const title = document.getElementById('modal-title').textContent;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            });
        } else {
            // نسخ الرابط للحالات التي لا تدعم Web Share API
            navigator.clipboard.writeText(url).then(() => {
                alert('تم نسخ رابط المقال إلى الحافظة');
            });
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// استدعاء الدالة في التهيئة
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    initArticleModals();
});