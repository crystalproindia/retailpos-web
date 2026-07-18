# CMS Content Export and Draft Preview

This project can export the approved static RetailPOS.biz website content into a JSON manifest for the RetailPOS Command Center CMS.

## Export

Run:

```bash
npm run cms:export
```

The command writes:

- `cms-export/retailpos-content.json`
- `cms-export/retailpos-content-report.md`

The export is deterministic. Re-running the command without changing website content should produce the same manifest hash.

## Import Workflow

1. Run `npm run cms:export`.
2. Review `cms-export/retailpos-content-report.md`.
3. Upload `cms-export/retailpos-content.json` at `app.retailpos.biz/website/import`.
4. Run **Dry Run** first.
5. Review created, updated, skipped, warning and failed counts.
6. Import as **Draft**.
7. Preview imported pages from the Command Center.
8. Publish pages individually after review.
9. Never use automatic mass publication without explicit approval.

## Rollback

The Command Center stores CMS revisions. Restore an earlier revision as a draft, review it through preview mode, and publish only after approval.

The static RetailPOS.biz website remains the fallback source. If CMS content is unpublished, invalid, unavailable or missing, the public website continues to render static approved content.

## Safety Notes

- The manifest must not contain tokens, API keys, passwords, revalidation secrets or private environment variables.
- Preview URLs are private and tokenized. Do not place preview links in analytics, public metadata, sitemaps, tickets or public documents.
- Newrie London is exported as draft framework content only. Optional claims require approval before publication.
