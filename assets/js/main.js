document.addEventListener('DOMContentLoaded', function() {
  // 访客统计功能
  initVisitorStats();
  
  // 移动端菜单切换
  initMobileMenu();
  
  // 平滑滚动
  initSmoothScroll();
});

// 访客统计初始化
function initVisitorStats() {
  // 这里可以集成真实的访客统计服务，比如Google Analytics
  // 现在使用本地存储模拟
  
  const pageViewsElement = document.getElementById('page-views');
  const visitorsElement = document.getElementById('visitors');
  
  if (pageViewsElement && visitorsElement) {
    // 模拟访客统计数据
    let pageViews = localStorage.getItem('pageViews') || 0;
    let visitors = localStorage.getItem('visitors') || 0;
    
    // 增加页面浏览量
    pageViews = parseInt(pageViews) + 1;
    localStorage.setItem('pageViews', pageViews);
    
    // 检查是否是新访客
    if (!localStorage.getItem('visited')) {
      visitors = parseInt(visitors) + 1;
      localStorage.setItem('visitors', visitors);
      localStorage.setItem('visited', 'true');
    }
    
    // 动画显示数字
    animateCounter(pageViewsElement, pageViews);
    animateCounter(visitorsElement, visitors);
  }
}

// 数字动画效果
function animateCounter(element, target) {
  const duration = 1000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// 移动端菜单初始化
function initMobileMenu() {
  const navTrigger = document.querySelector('.nav-trigger');
  const trigger = document.querySelector('.trigger');
  
  if (navTrigger && trigger) {
    navTrigger.addEventListener('change', function() {
      if (this.checked) {
        trigger.style.display = 'block';
        // 添加淡入动画
        setTimeout(() => {
          trigger.style.opacity = '1';
        }, 10);
      } else {
        trigger.style.opacity = '0';
        setTimeout(() => {
          trigger.style.display = 'none';
        }, 300);
      }
    });
    
    // 点击菜单项后关闭菜单
    const menuLinks = trigger.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navTrigger.checked = false;
        trigger.style.display = 'none';
      });
    });
  }
}

// 平滑滚动初始化
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 图片懒加载
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // 不支持IntersectionObserver的浏览器降级处理
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}

// 主题切换功能（可选）
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      // 保存主题偏好
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // 加载保存的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
}

// 添加返回顶部按钮
function initBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.style.display = 'none';
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 初始化所有功能
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initThemeToggle();
    initBackToTop();
  });
} else {
  initLazyLoading();
  initThemeToggle();
  initBackToTop();
} 