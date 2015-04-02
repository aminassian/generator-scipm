-- -*- coding: utf-8 -

-- lua links
-- ------------------------------------------------------------------------------
-- http://www.scintilla.org/SciTELua.html
-- http://lua-users.org/wiki/UsingLuaWithScite
-- http://lua-users.org/wiki/SciteScripts
-- http://lua-users.org/wiki/LuaDirectory
-- http://www.scintilla.org/PaneAPI.html
-- http://www.scintilla.org/SciTEDoc.html (all props)

-- lua props example
-- ------------------------------------------------------------------------------
--~ _ALERT('props[\'scipm.path.scipmproject\'] = ' .. props['scipm.path.scipmproject'])	-- added by scipm
--~ _ALERT('props[\'scipm.path.scipmchild\'] = ' .. props['scipm.path.scipmchild'])	-- added by scipm
--~ _ALERT('props[\'scipm.path.sep\'] = ' .. props['scipm.path.sep'])  -- added by scipm
--~ _ALERT('props[\'PLAT_WIN\'] = ' .. props['PLAT_WIN'])	--
--~ _ALERT('props[\'PLAT_GTK\'] = ' .. props['PLAT_GTK'])	--
--~ _ALERT('props[\'PLAT_UNIX\'] = ' .. props['PLAT_UNIX'])	--
--~ _ALERT('props[\'PLAT_MAC\'] = ' .. props['PLAT_MAC'])	--
--~ _ALERT('props[\'FilePath\'] = ' .. props['FilePath'])	-- full path of the current file
--~ _ALERT('props[\'FileDir\'] = ' .. props['FileDir'])	-- directory of the current file without a trailing slash
--~ _ALERT('props[\'FileName\'] = ' .. props['FileName'])	-- base name of the current file
--~ _ALERT('props[\'FileExt\'] = ' .. props['FileExt'])	-- extension of the current file
--~ _ALERT('props[\'FileNameExt\'] = ' .. props['FileNameExt'])	-- $(FileName).$(FileExt)
--~ _ALERT('props[\'Language\'] = ' .. props['Language'])	-- name of the lexer used for the current file
--~ _ALERT('props[\'SessionPath\'] = ' .. props['SessionPath'])	-- full path of the current session
--~ _ALERT('props[\'CurrentSelection\'] = ' .. props['CurrentSelection'])	-- value of the currently selected text
--~ _ALERT('props[\'CurrentWord\'] = ' .. props['CurrentWord'])	-- value of word which the caret is within or near
--~ _ALERT('props[\'Replacements\'] = ' .. props['Replacements'])	-- number of replacements made by last Replace command
--~ _ALERT('props[\'SelectionStartColumn\'] = ' .. props['SelectionStartColumn'])	-- column where selection starts
--~ _ALERT('props[\'SelectionStartLine\'] = ' .. props['SelectionStartLine'])	-- line where selection starts
--~ _ALERT('props[\'SelectionEndColumn\'] = ' .. props['SelectionEndColumn'])	-- column where selection ends
--~ _ALERT('props[\'SelectionEndLine\'] = ' .. props['SelectionEndLine'])	-- line where selection ends
--~ _ALERT('props[\'CurrentMessage\'] = ' .. props['CurrentMessage'])	-- most recently selected output pane message
--~ _ALERT('props[\'SciteDefaultHome\'] = ' .. props['SciteDefaultHome'])	-- directory in which the Global Options file is found
--~ _ALERT('props[\'SciteUserHome\'] = ' .. props['SciteUserHome'])	-- directory in which the User Options file is found
--~ _ALERT('props[\'SciteDirectoryHome\'] = ' .. props['SciteDirectoryHome'])	-- directory in which the Directory Options file is found
--~ _ALERT('props[\'APIPath\'] = ' .. props['APIPath'])	-- list of full paths of API files from api.filepattern
--~ _ALERT('props[\'AbbrevPath\'] = ' .. props['AbbrevPath'])	-- full path of abbreviations file
--~ scipm.vardump(scipm.data);

-- Example : read external config.lua . File content like ``{ ["key1"] = "hello", ["key2"] = 10 }``
-- -----------------------------------------------------------------------------------------------------
-- local f = io.open(table.concat({scipm.data.path.scipmchild, "<%= scipmDotName %>", "scite", "config.lua"}, scipm.data.path.sep), "rb")
-- local configContent = f:read("*all"); -- print(configContent)
-- dostring("<%= scipmDotName %>.config = " .. configContent);
-- scipm.vardump(<%= scipmDotName %>.config)
-- f:close()

-- --------------------------------------------------------------------------------------------------------------------------------
-- <%= scipmDotName %> namespace
-- --------------------------------------------------------------------------------------------------------------------------------
<%= scipmDotName %> = {}
<%= scipmDotName %>.config = {
    ["key1"] = "1"
};
<%= scipmDotName %>.data = {
    ["name"]= "<%= scipmDotName %>",
    ["click"]= 0
}

-- (global) <%= scipmDotName %>.start
-- -------------------------------------------------------------------------------
<%= scipmDotName %>.start = function (arg)
    local message = ">> " .. arg .. " " .. <%= scipmDotName %>.data.name .. " (doubleClick this line)"; -- _ALERT(message)
    local luaDoString = "<%= scipmDotName %>.doubleClick()"; -- _ALERT(luaDoString)
    -- scipm.core.PrintWithHiddenDoString => print output ``[message]...spaces...scipmHiddenDoString=[luaDoString]``
    -- when event extman ``scite_OnDoubleClick`` in output pane (see SciTEStartup.lua) => run ``scipm.HandleOutputDoubleClick()`` which extract string after ``scipmHiddenDoString=`` => dostring [extract]
    scipm.core.PrintWithHiddenDoString(message, luaDoString);
end

-- (global) <%= scipmDotName %>.doubleClick
-- -------------------------------------------------------------------------------
<%= scipmDotName %>.doubleClick = function ()

    -- swith SciTE[Global|User|Directory|].properties
    -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    local config_key1 = <%= scipmDotName %>.config.key1;
    if props["<%= scipmDotName %>.config.key1"] ~= "" then
        config_key1 = props["<%= scipmDotName %>.config.key1"];
    end -- print(config_key1)

    -- inc count
    -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    <%= scipmDotName %>.data.click = 1 + <%= scipmDotName %>.data.click;

    -- display count (and allow click)
    -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    local message = ">> doubleClick count=" .. <%= scipmDotName %>.data.click; -- _ALERT(message)
    local luaDoString = "<%= scipmDotName %>.doubleClick()"; -- _ALERT(luaDoString)
    scipm.core.PrintWithHiddenDoString(message, luaDoString); -- scipm.core.PrintWithHiddenDoString => print output ``[message]...spaces...scipmHiddenDoString=[luaDoString]``. When event extman ``scite_OnDoubleClick`` in output pane (see SciTEStartup.lua) => run ``scipm.HandleOutputDoubleClick()`` which extract string after ``scipmHiddenDoString=`` => dostring [extract]

end

-- exec now
-- -------------------------------------------------------------------------------
<%= scipmDotName %>.start("hello <%= scipmDotName %>");