#!/usr/bin/env python3
import json
import os
import sys
import time
import glob
# external: pip3 install PyYAML
import yaml

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
os.chdir(SCRIPT_DIR)


def readYaml(inputPath):
    try:
        with open(inputPath, "r") as inputStream:
            return yaml.safe_load(inputStream)
    except Exception as ex:
        print(" Error parsing yaml file ".center(80, "="))
        print(ex)
        sys.exit(1)


def writeJson(outputPath, data):
    with open(outputPath, "w") as output:
        json.dump(data, output, indent=2, sort_keys=True)


class Splitter:
    def __init__(self):
        self.lang_dict = {}

    def add_translation(self, lang, path, translation):
        dict_path = [lang] + path[:-1]
        node = self.lang_dict
        for segment in dict_path:
            if segment not in node:
                node[segment] = {}
            node = node.get(segment)
        node[path[-1]] = translation

    def find_used_languages(self, data):
        if type(data) == type({}):
            if "en" in data:
                # this is a multilanguage string
                for lang in data:
                    # register all the languages, that this string has
                    if lang not in self.lang_dict:
                        self.lang_dict[lang] = {}
            else:
                for sub_data in data.values():
                    self.find_used_languages(sub_data)

    def add(self, path, data):
        if type(data) == type("string"):
            for lang in self.lang_dict:
                self.add_translation(lang, path, data)
        elif "en" in data:
            for lang in self.lang_dict:
                if lang in data:
                    self.add_translation(lang, path, data[lang])
                else:
                    # No translation given, so fall back to default
                    print(f"[Missing translation] {'.'.join(path)} for language '{lang}'")
                    self.add_translation(lang, path, data["en"])
        else:
            for key, value in data.items():
                self.add(path + [key], value)


if __name__ == "__main__":
    # Convert the yaml files
    inputFile = os.path.join(".", "translations.yaml")
    inputData = readYaml(inputFile)

    splitter = Splitter()
    splitter.find_used_languages(inputData)
    splitter.add([], inputData)

    for old_file in glob.glob("*.json"):
        os.remove(old_file)

    for lang, data in splitter.lang_dict.items():
        outputFile = os.path.join(".", lang + ".json")
        print("{} -> {}".format(inputFile, outputFile))
        writeJson(outputFile, data)
