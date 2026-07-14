# APK and GitHub Release Plan

This is the approved release plan for publishing the first installable Android APK through a GitHub Release.

## Approved Choices

- Version and Git tag: `v0.1.0`.
- Publish the GitHub Release immediately, not as a draft.
- Commit release configuration changes before creating the tag.
- Expo/EAS is not currently logged in.
- GitHub CLI is currently logged in.
- Use the existing Expo account. Pause when `eas login` requires browser authentication or credentials.
- Recommended path: create a signed Android APK with EAS Build, then upload it to GitHub Releases with GitHub CLI.

## Important Note

`expo export --platform android` does not produce an installable APK. It exports a static JavaScript/native asset bundle for Expo workflows and should not be used as the release artifact.

## Prerequisites

- Work from the project root: `C:\Users\lenovo\Desktop\Projects\Torrentbay`.
- Confirm the worktree contains only intended release changes before committing or tagging.
- Ensure release configuration produces an Android APK, not only an AAB. For EAS, the Android build profile should use `android.buildType: "apk"`.

## Intended Commands

### 1. Validate Before Release Configuration

Run the existing quality gates before release-specific changes:

```sh
bun run format:check
bun run lint
bun run typecheck
bun test
bunx expo install --check
bunx expo-doctor
```

### 2. Log In To EAS

Use the existing Expo account:

```sh
bunx eas login
```

Pause here if the command requires browser authentication or credentials.

Confirm authentication after login:

```sh
bunx eas whoami
```

### 3. Configure EAS APK Build

If EAS has not already been configured, initialize it:

```sh
bunx eas build:configure
```

Ensure the selected Android release profile builds an APK. The intended `eas.json` shape is:

```json
{
  "build": {
    "production-apk": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### 4. Commit Release Configuration Before Tagging

Review and commit only intended release configuration changes:

```sh
git status
git diff
git add app.json eas.json package.json bun.lock
git commit -m "chore: configure Android APK release"
```

Adjust the `git add` file list to match the actual files changed by EAS configuration. Do not tag until this commit exists.

### 5. Create And Push Tag

Create the approved tag from the committed release configuration:

```sh
git tag v0.1.0
git push origin HEAD
git push origin v0.1.0
```

### 6. Build Signed Android APK With EAS

Start the APK build:

```sh
bunx eas build --platform android --profile production-apk
```

When the build completes, download the APK artifact from the EAS build URL or with the EAS CLI if available in the installed version. Save it using the approved versioned name:

```sh
mkdir -p dist
bunx eas build:download --platform android --latest --output dist/Torrentbay-v0.1.0.apk
```

If `eas build:download` is unavailable, use the artifact URL shown by `eas build` and save the file as `dist/Torrentbay-v0.1.0.apk`.

### 7. Publish GitHub Release Immediately

Create a non-draft GitHub Release and upload the APK:

```sh
gh release create v0.1.0 dist/Torrentbay-v0.1.0.apk --title "v0.1.0" --notes "Initial Android APK release."
```

Verify the release and asset:

```sh
gh release view v0.1.0 --web
```

## Release Checklist

- [ ] Quality gates passed.
- [ ] EAS login completed with the existing Expo account.
- [ ] EAS APK build profile configured.
- [ ] Release configuration committed before tagging.
- [ ] Tag `v0.1.0` created and pushed.
- [ ] Signed Android APK built by EAS.
- [ ] APK downloaded and named `Torrentbay-v0.1.0.apk`.
- [ ] GitHub Release `v0.1.0` published immediately, not as draft.
- [ ] APK attached to the GitHub Release.
