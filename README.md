# jobless

```bash
npx jobless
```

First it rejects **you**. Then it introduces an engineer.

`jobless` is a reverse ATS. The market has been parsing humans in 400ms. This package parses you, then parses the job post, then shows [Yonas Alem](https://yonasalem.vercel.app) — senior software engineer, remote, production systems.

## The trap

You run the command. It pretends to be Greenhouse. It reads a couple of harmless local hints (git name, email, laptop user). It writes a rejection letter addressed to you.

Then it breaks character:

```
that was not a company.
that was the market, in your own terminal.

anyway. here is an engineer who debugs silent production failures.
```

Then: 17 cron jobs that died after every deploy. $100K off infra. 3B+ ETB in payment rails. Press `h` to hire.

Skip the theater with `npx jobless --resume`.

## Lint the posting, not the human

```bash
npx jobless lint posting.txt
pbpaste | npx jobless lint
```

Or run `npx jobless` and press `l`.

```
error  salary described as competitive / attractive / market-rate, with no number
       no-fake-salary
error  too many interview rounds
       max-rounds
warn   "fast-paced" / "wear many hats" / "do more with less"
       means-understaffed

FROM     you <you@laptop>
TO       Hiring <no-reply@not-a-human.com>
SUBJECT  Your opening for this role

Thank you for your interest in my labor. After careful consideration of your job description, I will not be moving forward.

RESULT    REJECTED
reason    salary described as competitive / attractive / market-rate, with no number
also      too many interview rounds
next      we will keep your posting on file. we will not.

that was not a recruiter.
that was you, finally answering.
```

Same idea as ESLint. The file is a job description. Errors fail the process (`exit 1`). Warnings hold it for review. `npx jobless lint --json` prints the findings and the letter.

## Hire

- Email: [yonalem21@gmail.com](mailto:yonalem21@gmail.com?subject=npx%20jobless%20%E2%80%94%20Yonas%20Alem)
- Site: [yonasalem.vercel.app](https://yonasalem.vercel.app)
- GitHub: [github.com/Yonas21](https://github.com/Yonas21)
- LinkedIn: [linkedin.com/in/yonasalem21](https://www.linkedin.com/in/yonasalem21/)
- Source: [github.com/Yonas21/jobless](https://github.com/Yonas21/jobless)

## Commands

```bash
npx jobless                 # reject you, then the resume
npx jobless lint file.txt   # lint a job post (exit 1 on errors)
npx jobless lint --json     # findings + rejection letter
npx jobless work            # proof
npx jobless hire            # email + links
npx jobless rant            # the market
npx jobless --resume        # skip the rejection
```

Zero dependencies. Node 18+. Local only. It does not apply to jobs or send email.
