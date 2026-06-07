# CODEX_INITIAL_MESSAGE.md

Работай автономно по задаче `go2 audience analytics page` для репозитория `ogelslamovuk/cl_mediakit`.

## Источник задачи

Task package должен лежать в репозитории в папке:

`codex_tasks/2026-06-07-go2-audience-page/`

Перед любыми изменениями прочитай в таком порядке:

1. `AGENTS.md` в корне репозитория.
2. `SKILLS.md` в корне репозитория.
3. `codex_tasks/2026-06-07-go2-audience-page/CODEX_EXECUTOR_SKILL.md`
4. `codex_tasks/2026-06-07-go2-audience-page/CODEX_EXPECTED_RESULT.md`
5. `codex_tasks/2026-06-07-go2-audience-page/CODEX_IMPLEMENTATION_TASK.md`
6. `codex_tasks/2026-06-07-go2-audience-page/CODEX_ACCEPTANCE_CHECKLIST.md`

## Режим работы

Не спрашивай промежуточные approve.

Expected result уже согласован. Твоя задача — довести результат до acceptance autonomously.

Останавливайся только если:
- в репозитории отсутствуют критически нужные исходники и невозможно продолжить без них;
- GitHub Pages deploy технически недоступен из-за прав;
- выполнение требует сломать текущий медиакит.

## Главный результат

Финальный результат — НЕ pull request сам по себе.

Финальный результат — обновлённый production media kit, доступный по адресу:

`https://ogelslamovuk.github.io/cl_mediakit/`

Нужно:

1. Работать от текущего `main`.
2. Создать отдельную ветку.
3. Обновить медиакит: добавить 4-ю страницу/секцию с аудиторией и рекламным потенциалом на базе отчётов Яндекс.Метрики.
4. Сохранить визуальную стилистику текущих 3 страниц на 100%.
5. Синхронизировать HTML и PDF-версию медиакита, если PDF/source PDF есть в репозитории или может быть сгенерирован из landing.
6. Создать PR.
7. Довести изменения до merge/deploy/live-check через доступный Codex/GitHub workflow.
8. Дождаться успешного GitHub Pages deploy.
9. Проверить live URL.
10. В финальном ответе дать:
   - branch;
   - commit;
   - PR;
   - deploy run;
   - live URL;
   - что проверено;
   - список изменённых файлов;
   - screenshot/artifacts visual QA.

## Важно

Если текущая Codex-сессия работает без git remote, не пытайся пушить через shell.
Подготовь изменения корректно, чтобы их можно было применить через Codex UI `Create PR`.
Но не называй задачу готовой, пока production URL не обновлён и не проверен.
