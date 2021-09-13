#define MOD(a) ((a) % m)
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);

    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    const int m = 1000000007;

    int t, k, d, fs_index(-1);
    unsigned long long int s = 0, cv = 0, sv = 0, ps = 0, pv = 0;
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

        for (int i = 0, j = 0; i < k; i++, j++)
        {
            scanf(" %c", &c);

            if (c == '.')
            {
                // printf("s: %llu cv: %llu ps: %llu pv: %llu fs: %c ls: %c fs_index: %d\n", s, cv, ps, pv, fs, ls, fs_index);

                int fv = int(fs != '*' && ls != '*' && fs != ls);
                int h = j - d;
                int fi = j - fs_index;

                s = MOD(s + (s + j * cv + j * ps + h * fv * fi));
                ps = MOD(ps + (j * pv + ps + fv * fi));

                cv = MOD(cv + (cv + j * pv + h * fv));
                pv = MOD(pv + (fv + pv));

                // printf("s: %llu cv: %llu ps: %llu pv: %llu fv: %d fs: %d\n", s, cv, ps, pv, fv, fv * fi);

                j = 2 * j - 1;

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
                    sv = MOD(j - d);
                }

                ls = c;
                d = 0;
            }
            else
                d++;

            ps = MOD(ps + pv);

            cv = MOD(cv + sv);
            s = MOD(s + cv);
        }

        if (l != 0)
            printf("\n");

        printf("Case #%d: %u", l + 1, (unsigned int)s);
    }
}
