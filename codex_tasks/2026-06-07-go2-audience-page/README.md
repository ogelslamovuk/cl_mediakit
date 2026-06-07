# Go2.by audience analytics page task package

Папку положить в репозиторий:

`codex_tasks/2026-06-07-go2-audience-page/`

## Файлы

- `CODEX_INITIAL_MESSAGE.md` — первое сообщение для Codex.
- `CODEX_GITHUB_ISSUE.md` — body GitHub Issue.
- `CODEX_EXECUTOR_SKILL.md` — правила автономного исполнения.
- `CODEX_EXPECTED_RESULT.md` — согласованный ожидаемый результат.
- `CODEX_IMPLEMENTATION_TASK.md` — техническая постановка.
- `CODEX_ACCEPTANCE_CHECKLIST.md` — acceptance checklist.

## Порядок

1. Убедиться, что отчёты Яндекс.Метрики лежат в `reports/`.
2. Создать GitHub Issue с body из `CODEX_GITHUB_ISSUE.md`, если нужен issue.
3. В Codex отправить `CODEX_INITIAL_MESSAGE.md`.
4. Codex работает автономно до PR/merge/deploy/live-check.

## Главная acceptance-логика

Готово только если live-версия обновлена:

`https://ogelslamovuk.github.io/cl_mediakit/`
