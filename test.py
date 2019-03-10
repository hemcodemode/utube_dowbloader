import re
empcode = '2136'
print(re.sub(r'(\d)',r'\1 ',empcode))
empcode = 'hemant'
print(re.sub(r'(\d)',r'\1 ',empcode))
empcode = 'vidi-2136'
print(re.sub(r'(\d)',r'\1 ',empcode))
