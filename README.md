TestTask
========
Увеличение точности возможно за счет выбора оптимального числа идущих подряд запросов исходя из формулы: n = 2/(1-p), где p-требуемая вероятность, а n - количество запросов.
Также возможно ввести параметр амортизации и уточнить алгоритм расчета смещения, согласно методике The master-slave synchronization protocol, которая описана в статье "Probabilistic clock synchronization" by Flaviu Cristian Cristian, F. (1989).