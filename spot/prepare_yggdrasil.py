with open('/etc/yggdrasil.conf', 'r') as f:
    ygg = f.read()
ygg = ygg.replace('Peers: []', """
Peers:
[
tcp://ygg-ru.cofob.ru:18000
tcp://ygg-ru2.cofob.ru:80
tcp://ygg.loskiq.dev:17313
tcp://yggnode.cf:18226
tls://ygg-ru2.cofob.ru:443
tls://yggnode.cf:18227
tls://ygg.loskiq.dev:17314
tls://minecast.xyz:3785
tcp://yggdrasil.su:62486
tls://yggdrasil.su:62586
tcp://lax.yuetau.net:6642
tls://lax.yuetau.net:6643
tcp://213.188.199.150:10010
tcp://213.188.210.9:10010
tcp://[2a09:8280:1::3:312]:10010
tcp://[2a09:8280:1::a:2e2]:10010
tcp://46.151.26.194:60575
tcp://ygg-ru.cofob.ru:18000
tcp://ygg.tomasgl.ru:61933
tls://185.22.60.71:8443
tcp://51.15.118.10:62486
tls://ygg.loskiq.dev:17314
tls://longseason.1200bps.xyz:13122
]
""")

with open('/etc/yggdrasil.conf', 'w') as f:
    f.write(ygg)