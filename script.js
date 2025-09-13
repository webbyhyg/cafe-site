// DOM読み込み完了時の処理 test
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// アプリケーションの初期化
function initializeApp() {
    setupMobileMenu();
    setupScrollEffects();
    setupSmoothScroll();
    setupMenuTabs();
    setupReservationForm();
    setupIntersectionObserver();
    setMinDate();
}

// モバイルメニューの設定
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // メニューリンクをクリックしたらメニューを閉じる
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// スクロール効果の設定
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
}

// スムーススクロールの設定
function setupSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // ナビゲーションの高さを考慮
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// メニュータブの設定
function setupMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (tabButtons.length === 0 || menuItems.length === 0) return;
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // アクティブなボタンを変更
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // メニューアイテムの表示/非表示を制御
            menuItems.forEach(function(item) {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 予約フォームの設定
function setupReservationForm() {
    const form = document.getElementById('reserve-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

// フォームバリデーション
function validateForm() {
    const form = document.getElementById('reserve-form');
    const formData = new FormData(form);
    
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const date = formData.get('date');
    const time = formData.get('time');
    const number = formData.get('number');
    
    // 必須項目のチェック
    if (!name) {
        showAlert('お名前を入力してください', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showAlert('有効なメールアドレスを入力してください', 'error');
        return false;
    }
    
    if (!date) {
        showAlert('来店日を選択してください', 'error');
        return false;
    }
    
    if (!time) {
        showAlert('来店時間を選択してください', 'error');
        return false;
    }
    
    if (!number) {
        showAlert('人数を選択してください', 'error');
        return false;
    }
    
    // 日付の妥当性チェック
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showAlert('過去の日付は選択できません', 'error');
        return false;
    }
    
    // 電話番号の形式チェック（入力されている場合のみ）
    if (phone && !isValidPhone(phone)) {
        showAlert('電話番号の形式が正しくありません', 'error');
        return false;
    }
    
    return true;
}

// メールアドレスの妥当性チェック
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 電話番号の妥当性チェック
function isValidPhone(phone) {
    const phoneRegex = /^[\d\-\(\)\+\s]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// フォーム送信処理
function submitForm() {
    const form = document.getElementById('reserve-form');
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // ボタンの状態を変更
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;
    
    // 送信のシミュレーション
    setTimeout(function() {
        const name = formData.get('name').trim();
        const date = formData.get('date');
        const time = formData.get('time');
        const number = formData.get('number');
        
        const message = `ご予約ありがとうございます！\n\nお名前: ${name}\n日時: ${date} ${time}\n人数: ${number}名\n\n内容を確認の上、メールにてご連絡いたします。`;
        
        showAlert(message, 'success');
        form.reset();
        
        // ボタンの状態を戻す
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// アラート表示機能
function showAlert(message, type = 'info') {
    // 既存のアラートがあれば削除
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // アラート要素を作成
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.innerHTML = `
        <div class="custom-alert-content">
            <span class="custom-alert-message">${message.replace(/\n/g, '<br>')}</span>
            <button class="custom-alert-close">&times;</button>
        </div>
    `;
    
    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            z-index: 10000;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
        }
        
        .custom-alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .custom-alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .custom-alert-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .custom-alert-message {
            flex: 1;
            line-height: 1.4;
        }
        
        .custom-alert-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.3s ease;
        }
        
        .custom-alert-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .custom-alert {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alert);
    
    // 閉じるボタンのイベント
    const closeBtn = alert.querySelector('.custom-alert-close');
    closeBtn.addEventListener('click', function() {
        alert.remove();
        style.remove();
    });
    
    // 自動で消える（エラー以外）
    if (type !== 'error') {
        setTimeout(function() {
            if (alert.parentNode) {
                alert.remove();
                style.remove();
            }
        }, 5000);
    }
}

// Intersection Observer の設定
function setupIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    if (fadeElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
}

// 最小日付の設定
function setMinDate() {
    const dateInput = document.getElementById('date');
    
    if (!dateInput) return;
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

// ユーティリティ関数: デバウンス
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ウィンドウリサイズ時の処理（デバウンス適用）
window.addEventListener('resize', debounce(function() {
    // 必要に応じてリサイズ時の処理を追加
}, 250));

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // 本番環境では適切なエラーログ送信を実装
});

// 未処理のPromise rejection をキャッチ
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});