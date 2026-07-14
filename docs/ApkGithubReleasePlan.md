# Automated APK GitHub Release Plan

This is the release runbook for publishing installable Android APKs through the automated GitHub Actions workflow.

## Release Automation

- Releases are automated only by pushing a Git tag that matches `v*.*.*`, for example `v0.1.1`.
- The numeric tag version must match both `package.json` and `app.json` `expo.version`.
- The workflow builds the Android APK with EAS using the current EAS build profile name: `apk`.
- The required GitHub repository secret is `EXPO_TOKEN`. The token must authenticate EAS builds for the Expo account that owns the project.
- The GitHub Release is published immediately. It is not created as a draft.
- Existing release assets are not overwritten. If the release or asset upload would conflict with an existing asset, the workflow should fail so the conflict can be resolved explicitly.

## Important Note

`expo export --platform android` does not produce an installable APK. It exports a static JavaScript/native asset bundle for Expo workflows and should not be used as the release artifact.

## Prerequisites

- Work from the project root: `C:\Users\lenovo\Desktop\Projects\Torrentbay`.
- Confirm the worktree contains only intended release changes before committing or tagging.
- Confirm `EXPO_TOKEN` is configured in GitHub repository secrets.
- Confirm the EAS `apk` profile still produces an Android APK, not only an AAB. In `eas.json`, the profile should use `android.buildType: "apk"`.

## Future Release Steps

1. Bump the app version and Android `versionCode` in the app configuration.
2. Run the existing quality gates before release:

```sh
bun run format:check
bun run lint
bun run typecheck
bun test
bunx expo install --check
bunx expo-doctor
```

3. Commit the version changes and push the commit:

```sh
git status
git diff
git add app.json
git commit -m "chore: release vX.Y.Z"
git push origin HEAD
```

4. Create and push the matching release tag:

```sh
git tag vX.Y.Z
git push origin vX.Y.Z
```

5. Monitor the GitHub Actions run. A successful run should publish the non-draft GitHub Release and attach the APK asset.

## Release Checklist

- [ ] App version bumped.
- [ ] Android `versionCode` bumped.
- [ ] Quality gates passed.
- [ ] Version changes committed and pushed.
- [ ] Tag matching `v*.*.*` created and pushed.
- [ ] GitHub Actions EAS build used profile `apk`.
- [ ] GitHub Release published immediately, not as draft.
- [ ] APK attached to the GitHub Release.
- [ ] Workflow failed instead of overwriting any existing conflicting release asset.
