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

    int t, k, cv, sv, d, fs_index(0);
    unsigned int s = 0;
    char c, ls = '*', fs = '*';

    scanf("%d", &t);

    for (int l = 0; l < t; l++)
    {
        scanf("%d", &k);

        s = 0;
        d = 0;
        cv = 0;
        ls = '*';
        fs = '*';

        for (int j = 0; j < k; j++)
        {
            scanf(" %c", &c);

            sv = 0;

            if (c == 'X' || c == 'O')
            {
                if (ls != '*' && c != ls)

                    sv = MOD(j - d);

                ls = c;
                d = 0;
            }
            else
                d++;

            cv = MOD(cv + sv);
            s = MOD(s + cv);
        }

        if (l != 0)
            printf("\n");

        printf("Case #%d: %u", l + 1, s);
    }
}