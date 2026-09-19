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
error  salary described as competitive, with no number
       no-fake-salary
error  too many interview rounds
       max-rounds
warn   "fast-paced" / "wear many hats"
       means-understaffed

REJECTED   2 errors  1 warning
reason     failed the human compiler
```

Same idea as ESLint. The file is a job description. The company has to pass.

## Hire

- Email: [yonalem21@gmail.com](mailto:yonalem21@gmail.com?subject=npx%20jobless%20%E2%80%94%20Yonas%20Alem)
- Site: [yonasalem.vercel.app](https://yonasalem.vercel.app)
- GitHub: [github.com/Yonas21](https://github.com/Yonas21)
- LinkedIn: [linkedin.com/in/yonasalem21](https://www.linkedin.com/in/yonasalem21/)
- Source: [github.com/Yonas21/jobless](https://github.com/Yonas21/jobless)

## Commands

```bash
npx jobless                 # reject you, then the resume
npx jobless lint file.txt   # lint a job post
npx jobless work            # proof
npx jobless hire            # email + links
npx jobless rant            # the market
npx jobless --resume        # skip the rejection
```

Zero dependencies. Node 18+. Local only. It does not apply to jobs or send email.
