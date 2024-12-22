import { addStyle } from '../utils/add-style';

// 播放器视频裁切
export default function playerVideoFit() {
  if (location.href.startsWith('https://www.bilibili.com/video/')) {
    addStyle('body[video-fit] #bilibili-player video { object-fit: cover; } .bpx-player-ctrl-setting-fit-mode { display: flex;width: 100%;height: 32px;line-height: 32px; } .bpx-player-ctrl-setting-box .bui-panel-wrap, .bpx-player-ctrl-setting-box .bui-panel-item { min-height: 172px !important; }');
    let timer: number;
    function toggleMode(enabled: boolean) {
      if (enabled) {
        document.body.setAttribute('video-fit', '');
      } else {
        document.body.removeAttribute('video-fit');
      }
    }
    function injectButton() {
      if (!document.querySelector('.bpx-player-ctrl-setting-menu-left')) {
        return;
      }
      self.clearInterval(timer);
      const parent = document.querySelector('.bpx-player-ctrl-setting-menu-left');
      const item = document.createElement('div');
      item.className = 'bpx-player-ctrl-setting-fit-mode bui bui-switch';
      item.innerHTML = '<input class="bui-switch-input" type="checkbox"><label class="bui-switch-label"><span class="bui-switch-name">裁切模式</span><span class="bui-switch-body"><span class="bui-switch-dot"><span></span></span></span></label>';
      parent?.insertBefore(item, document.querySelector('.bpx-player-ctrl-setting-more'));
      document.querySelector<HTMLInputElement>('.bpx-player-ctrl-setting-fit-mode input')?.addEventListener('change', e => toggleMode((e.target as HTMLInputElement).checked));
      const panelItem = document.querySelector<HTMLElement>('.bpx-player-ctrl-setting-box .bui-panel-item');
      if (panelItem) {
        panelItem.style.height = '';
      }
    }
    timer = self.setInterval(injectButton, 200);
  }
}
