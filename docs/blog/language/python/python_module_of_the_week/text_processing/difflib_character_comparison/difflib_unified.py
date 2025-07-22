import difflib
import difflib_data


diff = difflib.unified_diff(
    difflib_data.text1_lines,
    difflib_data.text2_lines,
    lineterm='',
)
print('\n'.join(diff))
