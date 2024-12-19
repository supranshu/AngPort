import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="desktop-container">
      <div class="desktop-monitor">
        <div class="desktop-screen">
          <router-outlet></router-outlet>
        </div>
        <div class="home-button" (click)="createSparkles()"></div>
        <div class="desktop-stand"></div>
        <div class="desktop-base"></div>
      </div>
    </div>
  `
})
export class AppComponent {
  createSparkles() {
    const button = document.querySelector('.home-button') as HTMLElement;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 120; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';

      // Random angle and distance
      const angle = (i * 30) + Math.random() * 105;
      const distance = 50 + Math.random() * 2000;
      const tx = Math.cos(angle * Math.PI / 180) * distance;
      const ty = Math.sin(angle * Math.PI / 180) * distance;

      // Set position and color
      sparkle.style.left = `${centerX}px`;
      sparkle.style.top = `${centerY}px`;
      sparkle.style.setProperty('--tx', `${tx}px`);
      sparkle.style.setProperty('--ty', `${ty}px`);
      
      // Random color
      const colors = ['#fff', '#ffeb3b', '#ffc107', '#ff9800'];
      sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

      // Add animation
      sparkle.style.animation = 'sparkle 0.8s ease-out forwards';

      // Add to body and remove after animation
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  }
}