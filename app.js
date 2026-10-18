(function () {
  const c = window.CREATOR_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  document.title = `${c.name || 'Creator'} — YouTube Creator`;
  const validUrl = (value) => { try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u : null; } catch { return null; } };
  const getVideoId = (value) => { const u = validUrl(value); if (!u || !/^(www\.)?(youtube\.com|youtu\.be)$/.test(u.hostname)) return ''; if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0]; return u.searchParams.get('v') || u.pathname.match(/\/embed\/([^/]+)/)?.[1] || u.pathname.match(/\/shorts\/([^/]+)/)?.[1] || ''; };
  document.querySelectorAll('[data-creator-name]').forEach((el) => { el.textContent = c.name || '[Creator Name]'; });
  $('[data-featured-title]').textContent = c.featured?.title || 'Your featured video';
  $('[data-bio]').textContent = c.bio || '[Creator Name] is an independent creator. Add a short bio in config.js.';
  const profile = $('[data-profile-image]'); const profileSource = c.profileImage && (validUrl(c.profileImage) || c.profileImage.startsWith('/') || c.profileImage.startsWith('assets/')) ? c.profileImage : ''; if (profileSource) { profile.style.backgroundImage = `url("${profileSource}")`; profile.textContent = ''; profile.setAttribute('role', 'img'); profile.setAttribute('aria-label', `${c.name || 'Creator'} profile photo`); }
  const channel = validUrl(c.channelUrl); const channelLink = $('[data-channel-link]'); if (channel) { channelLink.href = channel.href; channelLink.target = '_blank'; channelLink.rel = 'noopener noreferrer'; } else channelLink.classList.add('is-disabled');
  const id = getVideoId(c.featured?.youtubeUrl); const featuredLink = $('[data-featured-link]'); if (id) { $('#video-container').innerHTML = `<iframe title="${c.featured.title || 'Featured YouTube video'}" src="https://www.youtube-nocookie.com/embed/${id}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`; featuredLink.href = `https://www.youtube.com/watch?v=${id}`; featuredLink.target = '_blank'; featuredLink.rel = 'noopener noreferrer'; } else featuredLink.classList.add('is-disabled');
  [['data-social-instagram', c.socials?.instagram], ['data-social-tiktok', c.socials?.tiktok]].forEach(([attribute, value]) => { const link = document.querySelector(`[${attribute}]`); const url = validUrl(value); if (url) { link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; } else { link.href = '#'; link.classList.add('is-disabled'); link.setAttribute('aria-label', `${attribute.includes('instagram') ? 'Instagram' : 'TikTok'} placeholder — add URL in config.js`); } });
})();
