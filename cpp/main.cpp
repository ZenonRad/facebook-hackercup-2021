#define MOD(a) ((a) % 1000000007)
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);

    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int t, k;
    unsigned long long int s = 0, cv = 0, sv = 0, ps = 0, pv = 0, d = 0, j = 0, fv = 0, fi = 0, fs_index = 0;
    char c, ls = '*', fs = '*';

    scanf("%d", &t);

    for (int l = 0; l < t; l++)
    {
        scanf("%d", &k);

        d = 0;
        s = 0;
        cv = 0;
        ps = 0;
        pv = 0;
        ls = '*';
        fs = '*';
        j = 0;

        for (int i = 0; i < k; i++, j++)
        {
            scanf(" %c", &c);

            if (c == '.')
            {
                // printf("s: %llu cv: %llu ps: %llu pv: %llu fs: %c ls: %c fs_index: %llu\n", s, cv, ps, pv, fs, ls, fs_index);

                fv = (unsigned long long int)int(fs != '*' && ls != '*' && fs != ls);
                fi = j - fs_index;

                s = MOD(MOD(2 * s) + MOD(j * cv) + MOD(j * ps) + MOD((j - d) * fv * fi));
                ps = 2 * ps + j * pv + fv * fi;

                cv = 2 * cv + j * pv + (j - d) * fv;
                pv = 2 * pv + fv;

                // s = MOD(s + (s + j * cv + j * ps + h * fv * fi));
                // ps = MOD(ps + (j * pv + ps + fv * fi));

                // cv = MOD(cv + (cv + j * pv + h * fv));
                // pv = MOD(pv + (fv + pv));

                // printf("s: %llu cv: %llu ps: %llu pv: %llu fv: %llu fs: %llu\n", s, cv, ps, pv, fv, fv * fi);

                j = MOD(2 * j - 1);

                continue;
            }

            if (fs == '*' && (c == 'X' || c == 'O'))
            {
                fs = c;
                fs_index = j;
            }

            sv = 0;

            if (c == 'X' || c == 'O')
            {
                if (ls != '*' && c != ls)
                {
                    pv++;
                    sv = j - d;
                }

                ls = c;
                d = 0;
            }
            else
                d++;

            ps += pv;

            cv += sv;
            s = MOD(s + cv);
        }

        if (l != 0)
            printf("\n");

        printf("Case #%d: %d", l + 1, (int)(s % 1000000007));
    }
}
