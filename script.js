const fadeElems = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.5
});

fadeElems.forEach(elem => {
    observer.observe(elem);
});

document.getElementById('reserve-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const date = this.date.value;
    const time = this.time.value;
    const number = this.number.value;

    if (!name) {
        alert('お名前を入力してください');
        return;
    }
    if (!email || !email.includes('@')) {
        alert('有効なメールアドレスを入力してください');
        return;
    }
    if (!date) {
        alert('来店日を選択してください');
        return;
    }
    if (!time) {
        alert('来店時間を選択してください');
        return;
    }
    if (!number || Number(number) < 1) {
        alert('1人以上を選択してください');
        return;
    }

    alert("ご予約ありがとうございます。内容を確認の上ご連絡いたします。");
    this.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tab-button');
    const items = document.querySelectorAll('.menu-item');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                item.style.display = (category === 'all' || itemCategory === category) ? 'block' : 'none';
            });
        });
    });
});
