// تأثيرات خاصة بصفحة التقاطع
document.addEventListener('DOMContentLoaded', function() {
    // تأثير الاندماج في الرسوم المتحركة
    const fusionCore = document.querySelector('.fusion-core');
    let scale = 1;
    let growing = true;
    
    setInterval(() => {
        if (growing) {
            scale += 0.02;
            if (scale >= 1.2) growing = false;
        } else {
            scale -= 0.02;
            if (scale <= 0.8) growing = true;
        }
        fusionCore.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }, 100);
});