# Sécuriser l'image

La containerisation permet d'utiliser facilement des logiciels, de monter régulièrement de version et de faire tourner rapidement un POC. 
Mais il est assez facile de récupérer une image vérolée, volontairement ou non, la plupart à cause de composants ou de librairies satellites embarqués dans l'image.
A titre d'exemple, en 2020, une étude trouvait [4 millions d'images vulnérables sur le docker hub](https://www.infoq.com/news/2020/12/dockerhub-image-vulnerabilities/). 
Depuis, les attaques dites de Supply Chain, qui touchent aux outils et workflow de déploiement et monitoring, sont de plus en plus concernantes, utiliser des images sécurisées est donc extrêmement important, même si l'éditeur est digne de confiance.

## Scan d'image avec Trivy

Nous allons utiliser l'outil [trivy](https://github.com/aquasecurity/trivy) édité par Aquasec, qui se base sur des bases pubilques de vulnérabilités. De nombreux outils similaires sont disponibles et utilisent en général les mêmes données de base.

Une manière simple de l'utiliser est via l'image docker fournie par aquasec :

```bash
$ podman pull aquasec/trivy:0.28.0
$ alias trivy='podman run --rm -v ~/.cache:/root/.cache/ aquasec/trivy:0.28.0'
```

> NB: toutes les commandes `podman` suivantes peuvent être remplacées à l'identique en remplaçant podman par `docker`. Podman est un runtime opensource dédié au développement développé par RedHat, et plus sécurisé que docker.

On peut ensuite procéder au scan de la manière suivante :

```bash
$ trivy image rabbitmq:3.11.2-management
[...]
rabbitmq:3.11.2-management (ubuntu 20.04)
=========================================
Total: 25 (UNKNOWN: 0, LOW: 22, MEDIUM: 3, HIGH: 0, CRITICAL: 0)

┌──────────────────────┬────────────────┬──────────┬──────────────────────────┬──────────────────────────┬──────────────────────────────────────────────────────────────┐
│       Library        │ Vulnerability  │ Severity │    Installed Version     │      Fixed Version       │                            Title                             │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ coreutils            │ CVE-2016-2781  │ LOW      │ 8.30-3ubuntu2            │                          │ coreutils: Non-privileged session can escape to the parent   │
│                      │                │          │                          │                          │ session in chroot                                            │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2016-2781                    │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ gcc-9-base           │ CVE-2020-13844 │ MEDIUM   │ 9.4.0-1ubuntu1~20.04.1   │                          │ kernel: ARM straight-line speculation vulnerability          │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2020-13844                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ gpgv                 │ CVE-2022-3219  │ LOW      │ 2.2.19-3ubuntu2.2        │                          │ gnupg: denial of service issue (resource consumption) using  │
│                      │                │          │                          │                          │ compressed packets                                           │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-3219                    │
├──────────────────────┼────────────────┤          ├──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libc-bin             │ CVE-2016-20013 │          │ 2.31-0ubuntu9.9          │                          │ sha256crypt and sha512crypt through 0.6 allow attackers to   │
│                      │                │          │                          │                          │ cause a denial of...                                         │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2016-20013                   │
├──────────────────────┤                │          │                          ├──────────────────────────┤                                                              │
│ libc6                │                │          │                          │                          │                                                              │
│                      │                │          │                          │                          │                                                              │
│                      │                │          │                          │                          │                                                              │
├──────────────────────┼────────────────┤          ├──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libgmp10             │ CVE-2021-43618 │          │ 2:6.2.0+dfsg-4           │ 2:6.2.0+dfsg-4ubuntu0.1  │ gmp: Integer overflow and resultant buffer overflow via      │
│                      │                │          │                          │                          │ crafted input                                                │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-43618                   │
├──────────────────────┼────────────────┤          ├──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libncurses6          │ CVE-2021-39537 │          │ 6.2-0ubuntu2             │                          │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                      │                │          │                          │                          │ captoinfo.c                                                  │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libncurses6          │ CVE-2022-29458 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: segfaulting OOB read                                │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libncursesw6         │ CVE-2021-39537 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                      │                │          │                          │                          │ captoinfo.c                                                  │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libncursesw6         │ CVE-2022-29458 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: segfaulting OOB read                                │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libpcre3             │ CVE-2017-11164 │ LOW      │ 2:8.39-12ubuntu0.1       │                          │ pcre: OP_KETRMAX feature in the match function in            │
│                      │                │          │                          │                          │ pcre_exec.c                                                  │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2017-11164                   │
├──────────────────────┼────────────────┤          ├──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libpython3.8-minimal │ CVE-2021-28861 │          │ 3.8.10-0ubuntu1~20.04.5  │                          │ python: an open redirection vulnerability in                 │
│                      │                │          │                          │                          │ lib/http/server.py may lead to information disclosure...     │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-28861                   │
├──────────────────────┤                │          │                          ├──────────────────────────┤                                                              │
│ libpython3.8-stdlib  │                │          │                          │                          │                                                              │
│                      │                │          │                          │                          │                                                              │
│                      │                │          │                          │                          │                                                              │
├──────────────────────┼────────────────┤          ├──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libtinfo6            │ CVE-2021-39537 │          │ 6.2-0ubuntu2             │                          │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                      │                │          │                          │                          │ captoinfo.c                                                  │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ libtinfo6            │ CVE-2022-29458 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: segfaulting OOB read                                │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ login                │ CVE-2013-4235  │ LOW      │ 1:4.8.1-1ubuntu5.20.04.2 │                          │ shadow-utils: TOCTOU race conditions by copying and removing │
│                      │                │          │                          │                          │ directory trees                                              │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2013-4235                    │
├──────────────────────┼────────────────┤          ├──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ ncurses-base         │ CVE-2021-39537 │          │ 6.2-0ubuntu2             │                          │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                      │                │          │                          │                          │ captoinfo.c                                                  │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ ncurses-base         │ CVE-2022-29458 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: segfaulting OOB read                                │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ ncurses-bin          │ CVE-2021-39537 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                      │                │          │                          │                          │ captoinfo.c                                                  │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ ncurses-bin          │ CVE-2022-29458 │ LOW      │ 6.2-0ubuntu2             │                          │ ncurses: segfaulting OOB read                                │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ passwd               │ CVE-2013-4235  │ LOW      │ 1:4.8.1-1ubuntu5.20.04.2 │                          │ shadow-utils: TOCTOU race conditions by copying and removing │
│                      │                │          │                          │                          │ directory trees                                              │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2013-4235                    │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ perl-base            │ CVE-2020-16156 │ MEDIUM   │ 5.30.0-9ubuntu0.2        │ 5.30.0-9ubuntu0.3        │ perl-CPAN: Bypass of verification of signatures in CHECKSUMS │
│                      │                │          │                          │                          │ files                                                        │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2020-16156                   │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ python3.8            │ CVE-2021-28861 │ LOW      │ 3.8.10-0ubuntu1~20.04.5  │                          │ python: an open redirection vulnerability in                 │
│                      │                │          │                          │                          │ lib/http/server.py may lead to information disclosure...     │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2021-28861                   │
├──────────────────────┤                │          │                          ├──────────────────────────┤                                                              │
│ python3.8-minimal    │                │          │                          │                          │                                                              │
│                      │                │          │                          │                          │                                                              │
│                      │                │          │                          │                          │                                                              │
├──────────────────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────────┤
│ zlib1g               │ CVE-2022-37434 │ MEDIUM   │ 1:1.2.11.dfsg-2ubuntu1.3 │ 1:1.2.11.dfsg-2ubuntu1.5 │ zlib: heap-based buffer over-read and overflow in inflate()  │
│                      │                │          │                          │                          │ in inflate.c via a...                                        │
│                      │                │          │                          │                          │ https://avd.aquasec.com/nvd/cve-2022-37434                   │
└──────────────────────┴────────────────┴──────────┴──────────────────────────┴──────────────────────────┴──────────────────────────────────────────────────────────────┘

```

On a donc plusieurs vulnérabilités **LOW** remontées par Trivy, et quelques MEDIUM, rien qui semble réellement bloquant dans notre cas.
Bien sûr il reste conseillé de procéder à une analyse au cas-par-cas avant de passer en production.

## Quand scanner ?

Lors d'un POC comme ici, il est important de vérifier que les images utilisées sont saines.

Ensuite, le mieux est d'automatiser les scans lors de la phase de CI où l'on construit l'image pour la push ou la promote sur le dépôt où elle sera stockée. 

Des scans additionnels peuvent être fait lors de failles majeures comme log4j.
