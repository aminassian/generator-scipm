-- -*- coding: utf-8 -
-- ------------------------------------------------------------------------------------------------
-- exec if package.json with
-- * ``scipmchild.SciTEStartup._use = filePath``
-- * ``scipmchild.SciTEStartup.filePath = "scite/SciTEStartup.part.lua"``
-- ------------------------------------------------------------------------------------------------

-- Example 1
-- ------------------------------------------------------------------------------------------------
print("scite/SciTEStartup.part.lua => hello <%= scipmDotName %>")

-- Example 2 (emulate ``scipmchild.SciTEStartup._use = dofile`` and ``scipmchild.SciTEStartup.dofile = ["scite", "main.lua"]``)
-- ------------------------------------------------------------------------------------------------
-- local doFilePath = table.concat({scipm.data.path.scipmchild, "<%= scipmDotName %>", "scite", "main.lua"}, scipm.data.path.sep); -- _ALERT(doFilePath)
-- dofile(doFilePath);



