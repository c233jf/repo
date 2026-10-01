import shutil


for format, exts, description in shutil.get_unpack_formats():
    print('{:<10} {}, names ending in {}'.format(format, description, exts))
