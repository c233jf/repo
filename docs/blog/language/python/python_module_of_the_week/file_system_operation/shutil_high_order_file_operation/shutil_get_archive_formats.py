import shutil


for format, description in shutil.get_archive_formats():
    print('{:<10} {}'.format(format, description))
