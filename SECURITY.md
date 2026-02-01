# Security Notes – Animetrix

## Fixes Applied

- **Admin page**: `router` was used in `useEffect` before declaration → moved `useRouter()` to top of component.
- **Collections page**: `IconComponent` could be `null` when item had no `lottieSrc` and no `iconName` → now always use `getIcon()` (fallback to `Box`).
- **Admin uploads**: Filename sanitized (no path traversal), 5MB max file size, only `.json`/`.lottie` allowed.
- **Signup/Login**: Client-side password length check (min 6 chars) to match Firebase requirements.
- **CollectionModal embed**: Title and color escaped in embed snippet to avoid attribute injection.
- **CORS**: `cors.json` rewritten as valid JSON (BOM removed).
- **Firebase**: Added `firestore.rules` and `storage.rules`, wired in `firebase.json`.

## Recommendations

1. **Next.js**: `npm audit` reports critical issues in Next.js. Run `npm audit` and consider `npm audit fix` or upgrading within your supported range.
2. **CORS**: `cors.json` uses `"origin": ["*"]`. For production, restrict to your app origins (e.g. `https://yourdomain.com`).
3. **Firebase rules**: Deploy with `firebase deploy --only firestore:rules,storage` after editing. Review `firestore.rules` / `storage.rules` for your auth model.
4. **Admin access**: `/admin` is protected by “logged-in” only. Consider role-based access (e.g. Firebase custom claims) if only some users should upload.
5. **ESLint**: `ignoreDuringBuilds: true` in `next.config.js` hides lint errors. Consider enabling ESLint during builds.
6. **Secrets**: Keep `.env*` out of version control. Firebase config uses `NEXT_PUBLIC_*` env vars correctly.

## Firestore / Storage Rules Overview

- **Firestore `animations`**: Read anyone; create/update/delete only when `request.auth != null`.
- **Storage `animations/`**: Read anyone; write only when authenticated, file &lt; 6MB, and content-type `application/json` or `application/octet-stream`.

Deploy rules:

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
```
