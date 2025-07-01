import logging
import os
import platform


if platform.platform().startswith('Windows'):
    homedrive = os.getenv('HOMEDRIVE') or ''
    homepath = os.getenv('HOMEPATH') or ''
    logging_file = os.path.join(homedrive, homepath, 'test.log')
else:
    home = os.getenv('HOME') or ''
    logging_file = os.path.join(home, 'test.log')

print("Logging to", logging_file)

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s : %(levelname)s : %(message)s',
    filename=logging_file,
    filemode='w',
)

logging.debug("Start of the program")
logging.info("Doing something")
logging.warning("Dying now")
