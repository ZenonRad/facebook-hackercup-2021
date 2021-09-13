#define MOD(a) ((a) % m)
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);

    // freopen("input.txt", "r", stdin);
    // freopen("input3.txt", "w", stdout);

    const int m = 1000000007;

    int t, k;
    char c;

    scanf("%d", &t);

    cout << t << endl
         << endl;

    for (int l = 0; l < t; l++)
    {
        scanf("%d", &k);

        string source(""), target("");

        for (int i = 0, j = 0; i < k; i++, j++)
        {
            scanf(" %c", &c);

            source.push_back(c);

            if (c == '.')
                target.append(target);
            else
                target.push_back(c);
        }

        cout << l;

        // cout << String(source.length) << endl
        //      << source << endl
        //      << String(target.length) << endl
        //      << target << endl
        //      << endl;
    }
}
