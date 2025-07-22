import difflib
import difflib_data


d = difflib.Differ()
diff = d.compare(difflib_data.text1_lines, difflib_data.text2_lines)
print('\n'.join(diff))
